import { Spin } from 'antd';
import { ComponentType, CSSProperties, lazy, Suspense } from 'react';

export const lazyLoad = (
  factory: () => Promise<{ default: ComponentType<unknown> }>
) => {
  // 设置页面加载中的loading居中
  const LayoutStyle: CSSProperties = {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };
  const LazyComponent = lazy(factory);
  return (
    <Suspense
      fallback={
        <div style={LayoutStyle}>
          <Spin size="large" />
        </div>
      }
    >
      <LazyComponent />
    </Suspense>
  );
};
