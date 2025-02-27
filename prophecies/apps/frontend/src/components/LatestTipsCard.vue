<template>
  <div class="latest-tips-card card card-body py-4 px-5 shadow">
    <div class="d-flex">
      <div class="mt-2 order-2" v-if="showClose">
        <a href="#" :title="closeLatestTips" @click="close">
          <x-icon class="latest-tips-card__close text-secondary" />
        </a>
      </div>
      <div class="d-flex flex-grow-1 align-items-center mt-3 mb-5">
        <smile-icon class="text-primary mr-4" />
        <slot name="title"></slot>
      </div>
    </div>
    <ul class="list-unstyled latest-tips-card__tips" v-if="hasLatestTips">
      <li class="latest-tips-card__tips__item" v-for="tip in latestTips" :key="tip.id">
        <div class="row">
          <div class="col">
            <router-link :to="{ name: 'tip-retrieve', params: { tipId: tip.id } }">
              <slot name="itemTitle" :tip="tip">
                <h2 class="latest-tips-card__tips__item__title-tips font-weight-bold">
                  {{ tip.name }}
                </h2>
              </slot>
            </router-link>
            <div class="negative-margin text-black-50">
              <small v-if="tip.task">
                {{ $t('latestTipsCard.inTaskAndProject', { task: tip.task.name, project: tip.project.name } )}}
              </small>
              <small v-else>
                {{ $t('latestTipsCard.general') }}
              </small>
            </div>
          </div>
        </div>
      </li>
    </ul>
    <slot name="footer" />
  </div>
</template>

<script>
export default {
  name: 'LatestTipsCard',
  props: {
    tips: {
      type: Array
    },
    showClose: {
      type: Boolean,
      default: false
    },
    limit: {
      type: Number,
      default: 3
    },
    itemTitleSize: {
      type: String
    }
  },
  computed: {
    closeLatestTips () {
      return this.$t('latestTipsCard.closeLatestTips')
    },
    latestTips () {
      return this.tips.slice(0, this.limit - 1)
    },
    hasLatestTips () {
      return this.latestTips.length > 0
    }
  },
  methods: {
    close () {
      /**
       * Emitted when the user clicked on the "close" button
       * @event close
       */
      this.$emit('close')
    }
  }
}

</script>

<style lang="scss" scoped>
  .latest-tips-card {
    &__title-tips {
      position: relative;
      padding-bottom: $spacer;

      &:after {
        content: "";
        width: 170%;
        max-width: 210px;
        position: absolute;
        bottom: 0%;
        left: 0;
        height: 7px;
        background: $warning;
        font-weight: 600;
      }
    }

    &__tips {

      &__item {
        margin-bottom: $spacer-lg;

        &__title-tips {
          color: $body-color;
          margin-bottom: $spacer-lg;
        }

        .negative-margin {
          margin-top: -15px
        }
      }
    }
  }
</style>
