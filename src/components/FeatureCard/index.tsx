import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

interface FeatureCardProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  link?: string;
  className?: string;
}

export default function FeatureCard({
  title,
  description,
  icon,
  link,
  className,
}: FeatureCardProps): JSX.Element {
  const CardContent = (
    <div className={clsx('card', styles.featureCard, className)}>
      {icon && (
        <div className={styles.iconContainer}>
          {icon}
        </div>
      )}
      <div className="card__body">
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
      </div>
    </div>
  );

  if (link) {
    return (
      <a href={link} className={styles.cardLink}>
        {CardContent}
      </a>
    );
  }

  return CardContent;
}
