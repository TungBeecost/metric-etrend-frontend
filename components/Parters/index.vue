<template>
  <div class="wrapper">
    <div class="sectionHeader">
      <p class="sectionTitle">Hơn 1000+ đối tác tin cậy của Metric</p>
    </div>
    <div class="default_section" style="overflow: hidden;">
      <div class="brand-list">
        <div v-for="(brand, index) in PARTERS" :key="index" class="brand-item loop">
          <img :src="brand" alt="brand_logo">
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import {gsap} from 'gsap';
import {PARTERS} from "~/constant/constains"

onMounted(() => {
  const boxes = gsap.utils.toArray('.brand-item.loop')
  horizontalLoop(boxes, {
    paused: false,
    speed: 0.3,
    repeat: -1,
    paddingRight: 32,
  })
  function horizontalLoop(items, config) {
    items = gsap.utils.toArray(items)
    config = config || {}
    const tl = gsap.timeline({
      repeat: config.repeat,
      paused: config.paused,
      defaults: {ease: 'none'},
      onReverseComplete: () =>
        tl.totalTime(tl.rawTime() + tl.duration() * 100),
    });
    const length = items.length;
    const startX = items[0].offsetLeft;
    const times = [];
    const widths = [];
    const xPercents = [];
    // const curIndex = 0;
    const pixelsPerSecond = (config.speed || 1) * 100;
    const snap =
      config.snap === false ? (v) => v : gsap.utils.snap(config.snap || 1); // some browsers shift by a pixel to accommodate flex layouts, so for example if width is 20% the first element's width might be 242px, and the next 243px, alternating back and forth. So we snap to 5 percentage points to make things look more natural
    // const totalWidth;
    let curX;
    let distanceToStart;
    let distanceToLoop;
    let item;
    let i

    gsap.set(items, {
      // convert "x" to "xPercent" to make things responsive, and populate the widths/xPercents Arrays to make lookups faster.
      xPercent: (i, el) => {
        const w = (widths[i] = parseFloat(gsap.getProperty(el, 'width', 'px')))
        xPercents[i] = snap(
          (parseFloat(gsap.getProperty(el, 'x', 'px')) / w) * 100 +
          gsap.getProperty(el, 'xPercent')
        )
        return xPercents[i]
      },
    })
    gsap.set(items, {x: 0})
    const totalWidth =
      items[length - 1].offsetLeft +
      (xPercents[length - 1] / 100) * widths[length - 1] -
      startX +
      items[length - 1].offsetWidth *
      gsap.getProperty(items[length - 1], 'scaleX') +
      (parseFloat(config.paddingRight) || 0)

    for (i = 0; i < length; i++) {
      item = items[i]
      curX = (xPercents[i] / 100) * widths[i]

      distanceToStart = item.offsetLeft + curX - startX
      distanceToLoop =
        distanceToStart + widths[i] * gsap.getProperty(item, 'scaleX')

      tl.to(
        item,
        {
          xPercent: snap(((curX - distanceToLoop) / widths[i]) * 100),
          duration: distanceToLoop / pixelsPerSecond,
        },
        0
      )
        .fromTo(
          item,
          {
            xPercent: snap(
              ((curX - distanceToLoop + totalWidth) / widths[i]) * 100
            ),
          },
          {
            xPercent: xPercents[i],
            duration:
              (curX - distanceToLoop + totalWidth - curX) / pixelsPerSecond,
            immediateRender: false,
          },
          distanceToLoop / pixelsPerSecond
        )
        .add('label' + i, distanceToStart / pixelsPerSecond)
      times[i] = distanceToStart / pixelsPerSecond
    }
    tl.times = times
    tl.progress(1, true).progress(0, true) // pre-render for performance
    if (config.reversed) {
      tl.vars.onReverseComplete()
      tl.reverse()
    }
    return tl
  }
})

onBeforeUnmount(() => {
  gsap.killTweensOf('.brand-item.loop')
})
</script>

<style lang="scss" scoped>
.wrapper {
  width: 100%;
  gap: 40px;
  display: flex;
  flex-direction: column;

  @include mobile {
    //padding: 0px 16px;
    margin: 24px 0;
    gap: 24px;
  }

  .sectionHeader {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    text-align: center;

    .sectionTitle {
      font-size: 40px;
      font-weight: 700;
      line-height: 56px;

      @include mobile {
        line-height: 38px;
        font-size: 24px;
      }
    }
  }

  .brand-list {
    display: flex;
    gap: 40px;

    width: fit-content;

    margin: 0 auto 24px;

    overflow: hidden;

    .brand-item {
      background-color: #fff;

      //height: 120px;
      width: 139px;

      display: flex;
      align-items: center;
      justify-content: center;

      padding: 5px;
      border-radius: 5px;
      z-index: 2;

      img {
        //height: 60px;
        width: 100%;
        object-fit: contain;
      }
    }
  }
}

</style>