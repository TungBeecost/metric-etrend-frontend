<script setup lang="ts">
import { notification } from 'ant-design-vue';
import { onMounted, h, defineEmits, onUnmounted } from 'vue';
import { onBeforeRouteLeave } from 'vue-router';
import { useCurrentUser } from "~/stores/current-user";

const emit = defineEmits(['handle-advertisement']);

let notificationTimeout: number | undefined;

const svgIcon = () => (
    h('svg', {
      xmlns: 'http://www.w3.org/2000/svg',
      width: '16',
      height: '16',
      viewBox: '0 0 16 16',
      fill: 'none',
      style: { marginRight: '8px' },
    }, [
      h('g', { 'clip-path': 'url(#clip0_5203_183660)' }, [
        h('path', {
          d: 'M2.5 9L6 12.5L14 4.5',
          stroke: '#35A855',
          'stroke-width': '1.3',
          'stroke-linecap': 'round',
          'stroke-linejoin': 'round',
        }),
      ]),
      h('defs', [
        h('clipPath', { id: 'clip0_5203_183660' }, [
          h('rect', { width: '16', height: '16', fill: 'white' }),
        ]),
      ]),
    ])
);

const openNotification = () => {
  notification.open({
    message: '',
    description: () => (
        h('div', {
          style: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            paddingTop: '16px',
          }
        }, [
          h('div', { style: { display: 'flex', alignItems: 'center', marginBottom: '12px' } }, [
            h('p', {
              style: {
                color: 'var(--Dark-blue-dark-blue-8, #241E46)',
                fontSize: '24px',
                fontWeight: '700',
                lineHeight: '32px',
              }
            }, 'Đăng ký thông tin để nhận báo cáo thị trường miễn phí'),
          ]),
          h('div', { style: { display: 'flex', alignItems: 'center', marginBottom: '12px' } }, [
            svgIcon(),
            h('p', 'Truy cập tìm kiếm kho báo cáo không giới hạn'),
          ]),
          h('div', { style: { display: 'flex', alignItems: 'center', marginBottom: '12px' } }, [
            svgIcon(),
            h('p', 'Khám phá toàn bộ báo cáo thị trường miễn phí'),
          ]),
          h('div', { style: { display: 'flex', alignItems: 'center', marginBottom: '12px' } }, [
            svgIcon(),
            h('p', 'Dữ liệu đầy đủ và trực quan'),
          ]),
          h('div', {
            style: {
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '16px',
              marginTop: '36px',
            }
          }, [
            h('img', {
              src: '/ereport/images/Thumbnail_popup_1.png',
              alt: 'Thumbnail 1',
              style: {
                width: '148px',
                height: '107px',
                boxShadow: '0px 0px 6px 0px rgba(0, 0, 0, 0.25)',
                objectFit: 'cover',
                borderRadius: '8px', // Add border radius
              }
            }),
            h('img', {
              src: '/ereport/images/Thumbnail_popup_2.png',
              alt: 'Thumbnail 2',
              style: {
                width: '148px',
                height: '107px',
                boxShadow: '0px 0px 6px 0px rgba(0, 0, 0, 0.25)',
                objectFit: 'cover',
                borderRadius: '8px', // Add border radius
              }
            }),
          ]),
          h('button', {
            style: {
              display: 'flex',
              width: '100%',
              height: '40px',
              padding: '9px 16px',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: '8px',
              background: 'var(--Volcano-volcano-6, #E85912)',
              color: '#fff',
              border: 'none',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '400',
              textAlign: 'center',
              marginTop: '36px',
            },
            onClick: () => {
              emit('handle-advertisement');
              notification.destroy();
            }
          }, 'Đăng ký ngay')
        ])
    ),
    placement: 'bottomRight',
    duration: 0,
    onClick: () => {
      console.log('Notification Clicked!');
    },
  });
};

const closeNotification = () => {
  notification.destroy();
};

onMounted(() => {
  const currentUserStore = useCurrentUser();
  const { userInfo } = storeToRefs(currentUserStore);

  if (!userInfo.value.id) {
    notificationTimeout = window.setTimeout(() => {
      openNotification();
    }, 30000);
  }

  window.addEventListener('close-advertisement', closeNotification);
});

onUnmounted(() => {
  if (notificationTimeout) {
    window.clearTimeout(notificationTimeout);
  }
  window.removeEventListener('close-advertisement', closeNotification);
});

onBeforeRouteLeave(() => {
  closeNotification();
});
</script>
