<script>
import TaskProgress from '@/components/TaskProgress'

export default {
  name: 'TaskStatsCardAllRounds',
  components: {
    TaskProgress
  },
  props: {
    progress: {
      type: Number
    },
    done: {
      type: Number
    },
    pending: {
      type: Number
    },
    color: {
      type: String
    }
  },
  filters: {
    round (value) {
      return Math.round(value)
    }
  }
}
</script>

<template>
  <div class="task-stats-card-all-rounds">
    <slot name="top"></slot>
    <b-row class="task-stats-card-all-rounds__card  card card-body rounded font-weight-bold mx-0">
      <div
        class="
          task-stats-card-all-rounds__all
          text-center
          text-primary
          col-2
          px-0
        "
      >
        <slot name="title">All</slot>
      </div>
      <b-col class="task-stats-card-all-rounds__stats pr-0 col-10">
        <b-row
          class="
            task-stats-card-all-rounds__stats__progress-bar
            mx-auto
            py-2
          "
        >
          <b-progress class="col-12 p-0" :value="progress | round" :max="100" />
        </b-row>
        <b-row class="mt-1">
          <div class="d-flex flex-shrink-1 px-3" :title="$t('taskStatsCard.taskProgression')">
            <task-progress :progress="progress | round" :color="color" />
          </div>
          <b-col class="px-1 text-center" :title="$t('taskStatsCard.doneRecords')">
            <span class="sr-only">{{$t('taskStatsCard.done')}}</span>{{done}}<check-icon size="1x" class="text-primary ml-2 mb-1" /></b-col>
          <b-col class="px-1 text-center" :title="$t('taskStatsCard.pendingRecords')">
            <span class="sr-only">{{$t('taskStatsCard.pending')}}</span>{{pending}}<clock-icon size="1x" class="text-danger ml-2 mb-1" /></b-col>
        </b-row>
      </b-col>
    </b-row>
  </div>
</template>

<style lang="scss" scoped>
.task-stats-card-all-rounds {
  min-width: 340px;
  max-width: 360px;

  &__card{
    max-height: 93px;
    padding-left: $spacer-xl;
    padding-right: $spacer-xxl;
    background-color: $secondary-50;
  }
  &__stats {
    &__progress-bar {
      height: 2em;
      width: 100%;

    }
    &__progress {
      width: 45px;
      background: var(--progress-fg, $primary) !important;
    }
  }
}
</style>
