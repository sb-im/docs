import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/intro">
            快速开始
          </Link>
        </div>
      </div>
    </header>
  );
}

function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          <div className={clsx('col col--4')}>
            <div className="text--center">
              <h3>无人机自动机场</h3>
              <p>
                全自动无人机机场系统，支持自动起降、充电、数据传输等功能。
              </p>
            </div>
          </div>
          <div className={clsx('col col--4')}>
            <div className="text--center">
              <h3>智能控制系统</h3>
              <p>
                先进的飞行控制和任务管理系统，实现全程无人化自动巡检。
              </p>
            </div>
          </div>
          <div className={clsx('col col--4')}>
            <div className="text--center">
              <h3>开发者友好</h3>
              <p>
                完整的API文档和SDK，让开发者轻松集成和定制功能。
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title} - 无人机自动机场系统`}
      description="草莓创新无人机自动机场系统开发者文档">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
