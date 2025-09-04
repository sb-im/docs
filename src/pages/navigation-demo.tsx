import React from 'react';
import Layout from '@theme/Layout';
import NavigationDemo from '../components/NavigationDemo';

export default function NavigationDemoPage() {
  return (
    <Layout
      title="移动端导航方案演示"
      description="体验不同的移动端导航方案，包括简化版导航和嵌套层级导航"
    >
      <NavigationDemo />
    </Layout>
  );
}
