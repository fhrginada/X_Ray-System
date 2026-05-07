import React from 'react';
import { Badge } from '../ui/badge';
import { REQUEST_STATUS } from '../../constants/workflow';

const variantMap = {
  [REQUEST_STATUS.PENDING]: 'warning',
  [REQUEST_STATUS.ACCEPTED]: 'info',
  [REQUEST_STATUS.IN_PROGRESS]: 'default',
  [REQUEST_STATUS.COMPLETED]: 'success',
  [REQUEST_STATUS.REJECTED]: 'danger',
};

export default function StatusBadge({ status }) {
  const label = (status || '').replace('-', ' ') || 'unknown';
  return <Badge variant={variantMap[status] || 'default'}>{label}</Badge>;
}
