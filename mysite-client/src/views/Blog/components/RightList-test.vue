<template>
  <RightList :list="list" @select="handleSelect" />
</template>

<script>
import RightList from "./RightList.vue";
export default {
  components: {
    RightList,
  },
  data() {
    return {
      list: [
        {
          name: "a",
          isSelected: false,
          children: [
            {
              name: "a-1",
              isSelected: false,
            },
          ],
        },
        { name: "b", isSelected: false },
        {
          name: "c",
          isSelected: true,
          children: [
            {
              name: "c-1",
              isSelected: false,
            },
            {
              name: "c-2",
              isSelected: false,
              children: [
                {
                  name: "c-2-1",
                  isSelected: false,
                },
                {
                  name: "c-2-2",
                  isSelected: false,
                },
              ],
            },
            {
              name: "c-3",
              isSelected: false,
            },
            {
              name: "c-4",
              isSelected: false,
            },
          ],
        },
        { name: "d", isSelected: false },
      ],
    };
  },
  methods: {
    handleSelect(item) {
      console.log(item);
    },
  },
};
</script>

<style></style>
