import { connect } from 'vuex-connect'
import DocumentEditor from './DocumentEditor.vue'
import editableTypes from '../../../store/modules/editable/types'
import { stateToProps, actionsToEvents } from 'vuex-connect-namespace-helper'
export default connect({
  stateToProps: {
    ...stateToProps('editable', {
      markdown: 'markdown',
      previewedHtml: 'convertedHtml',
    }),
  },
  actionsToEvents: {
    ...actionsToEvents('editable', {
      writeMarkdown: editableTypes.WRITE_MARKDOWN,
      fetchConvertedHtml: editableTypes.FETCH_CONVERTED_HTML,
    }),
  },
  lifecycle: {
    mounted: async store => {
      await store.dispatch(`editable/${editableTypes.FETCH_MARKDOWN}`)
    },
  },
})(DocumentEditor)
