import './card.scss'
import { capitalize } from '../../utils'
import SbLink from '../Link'

const SbCard = {
  name: 'SbCard',

  props: {
    title: {
      type: String,
      default: null
    },
    linkLabel: {
      type: String,
      default: null
    },
    url: {
      type: String,
      default: null
    },
    isBorderless: {
      type: Boolean,
      default: false
    }
  },

  render (h) {
    const renderTitle = () => {
      if (this.title) {
        return h('span', {
          staticClass: 'sb-card--title'
        },
        [capitalize(this.title)])
      }
      return null
    }

    const renderOptions = () => {
      return null
    }

    const renderLink = () => {
      if (this.url) {
        return h(SbLink, {
          props: {
            label: capitalize(this.linkLabel || 'label'),
            href: this.url,
            title: `Link to ${capitalize(this.linkLabel || 'label')}.`,
            type: 'primary',
            iconRight: 'chevron-right'
          }
        })
      }
    }

    const renderCardContent = () => {
      return h('div', {
        staticClass: 'sb-card--content'
      },
      [
        this.$slots.default
      ])
    }

    const renderCard = () => {
      return h('div', {
        staticClass: 'sb-card',
        class: {
          'sb-card--borderless': this.isBorderless
        }
      },
      [
        renderTitle(),
        renderOptions(),
        renderCardContent(),
        renderLink()
      ])
    }

    return renderCard()
  }
}

export default SbCard
