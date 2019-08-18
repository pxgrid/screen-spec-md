export default () => {
  return {
    // 画面仕様書の画像情報
    editScreen: {
      width: 300,
      height: 150,
      src: '',
      filename: '',
      selectedItem: -1,
      zoom: 1.0,
    },
    // 複数のハイライトの座標、幅、高さ情報 [[x, y, w, h], [x, y, w, h],...]
    coordinates: [],
    treeData: {},
  }
}
