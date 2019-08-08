const path = require('path')
const express = require('express')
const chokidar = require('chokidar')

const generateSpec = require('../lib/generate-spec')
const { productionEditable } = require('../server/editable')

const createServer = serveDir => {
  const app = express()
  app.use(express.static(serveDir))
  return app
}

const state = {
  server: null,
  sockets: [],
}

function start(mdDir, serveDir, port) {
  const app = createServer(serveDir)
  state.server = app.listen(port, () => {
    console.log(`edit-server: http://localhost:${port}`)
  })
  state.server.on('connection', socket => {
    console.log('Add socket', state.sockets.length + 1)
    state.sockets.push(socket)
  })

  productionEditable(app, mdDir, serveDir, port)
}

function restart(mdDir, serveDir, port) {
  state.sockets.forEach((socket, index) => {
    console.log('Destroying socket', index + 1)
    if (socket.destroyed === false) {
      socket.destroy()
    }
  })
  state.sockets = []
  state.server.close(() => {
    console.log('\n********* Restart edit-server *********')
    start(mdDir, serveDir, port)
  })
}

const startEditServer = async (mdDir, serveDir, port) => {
  await generateSpec(mdDir, serveDir, { isEditable: true })
  start(mdDir, serveDir, port)

  const watcher = chokidar.watch(mdDir, {
    ignoreInitial: true,
    persistent: true,
  })
  watcher
    .on('add', async absoluteMdPath => {
      const targetMdPath = path.relative(mdDir, absoluteMdPath)
      console.log(`File ${targetMdPath} has been added`)
      await generateSpec(mdDir, serveDir, { isEditable: true, targetMdPath: targetMdPath })
      restart(mdDir, serveDir, port)
    })
    .on('change', async absoluteMdPath => {
      const targetMdPath = path.relative(mdDir, absoluteMdPath)
      console.log(`File ${targetMdPath} has been changed`)
      await generateSpec(mdDir, serveDir, { isEditable: true, targetMdPath: targetMdPath })
      restart(mdDir, serveDir, port)
    })
    .on('unlink', async absoluteMdPath => {
      const targetMdPath = path.relative(mdDir, absoluteMdPath)
      console.log(`File ${targetMdPath} has been removed`)
      await generateSpec(mdDir, serveDir, { isEditable: true, targetMdPath: targetMdPath })
      restart(mdDir, serveDir, port)
    })
}

module.exports = startEditServer
