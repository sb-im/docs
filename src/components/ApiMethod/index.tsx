import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

interface ApiMethodProps {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  path: string;
  description?: string;
  className?: string;
}

const methodColors = {
  GET: styles.get,
  POST: styles.post,
  PUT: styles.put,
  DELETE: styles.delete,
  PATCH: styles.patch,
};

export default function ApiMethod({
  method,
  path,
  description,
  className,
}: ApiMethodProps): JSX.Element {
  return (
    <div className={clsx(styles.apiMethod, className)}>
      <div className={styles.methodLine}>
        <span className={clsx(styles.method, methodColors[method])}>
          {method}
        </span>
        <code className={styles.path}>{path}</code>
      </div>
      {description && (
        <p className={styles.description}>{description}</p>
      )}
    </div>
  );
}
