<template>
  <div class="sb-accordion" :class="computedClass">
    <button
      class="sb-accordion__button"
      :aria-expanded="isOpenLocal"
      :aria-controls="`collapse${_uid}`"
      @click="toggleAccordion"
    >
      <SbIcon :name="chevronIcon" />
      <p class="sb-accordion__title">{{ title }}</p>

      <SbIcon
        v-if="icon"
        v-tooltip="{ label: iconDescription }"
        :name="icon"
        class="sb-accordion__icon"
        @click.stop="$emit('icon-click')"
      />
    </button>

    <AccordionTransition>
      <div
        v-show="isOpenLocal"
        :id="`collapse${_uid}`"
        class="sb-accordion__content"
      >
        <slot />
      </div>
    </AccordionTransition>
  </div>
</template>

<script>
import SbIcon from '../Icon'
import AccordionTransition from './AccordionTransition'

export default {
  name: 'SbAccordion',
  components: {
    AccordionTransition,
    SbIcon,
  },
  props: {
    icon: {
      type: String,
      default: null,
    },
    iconDescription: {
      type: String,
      default: '',
    },
    isOpen: {
      type: Boolean,
      default: false,
    },
    noPadding: {
      type: Boolean,
      default: false,
    },
    noHighlight: {
      type: Boolean,
      default: false,
    },
    noBorder: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: null,
      required: true,
    },
  },
  data() {
    return {
      isOpenLocal: false,
    }
  },
  computed: {
    chevronIcon() {
      return this.isOpenLocal ? 'chevron-down' : 'chevron-right'
    },
    computedClass() {
      return {
        'sb-accordion--open': this.isOpenLocal,
        'sb-accordion--no-highlight': this.noHighlight,
        'sb-accordion--no-padding': this.noPadding,
        'sb-accordion--no-border': this.noBorder,
      }
    },
  },
  watch: {
    isOpen(newValue) {
      this.isOpenLocal = newValue
    },
  },
  mounted() {
    this.isOpenLocal = this.isOpen
  },
  methods: {
    toggleAccordion() {
      this.isOpenLocal = !this.isOpenLocal
      this.$emit('toggle-open', this.isOpenLocal)
    },
  },
}
</script>
