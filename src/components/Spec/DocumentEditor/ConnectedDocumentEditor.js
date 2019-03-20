import { connect } from 'vuex-connect'
import DocumentEditor from './DocumentEditor.vue'
import editableTypes from '../../../store/modules/editable/types'
import { stateToProps } from 'vuex-connect-namespace-helper'
export default connect({
  stateToProps: {
    ...stateToProps('editable', {
      markdown: 'markdown',
    }),
  },
  lifecycle: {
    mounted: async store => {
      await store.dispatch(`editable/${editableTypes.FETCH_MARKDOWN}`)
    },
  },
})(DocumentEditor)
