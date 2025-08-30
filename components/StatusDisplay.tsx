
import React from 'react';
import type { Status } from '../types';
import { StatusType } from '../types';

interface StatusDisplayProps {
  status: Status;
}

const StatusDisplay: React.FC<StatusDisplayProps> = ({ status }) => {
  const colorClasses = {
    [StatusType.Initial]: 'text-indigo-200',
    [StatusType.Info]: 'text-blue-300',
    [StatusType.Error]: 'text-red-400',
    [StatusType.Success]: 'text-green-300',
  };
  
  const iconClasses = {
    [StatusType.Initial]: 'fa-solid fa-lightbulb',
    [StatusType.Info]: 'fa-solid fa-circle-info',
    [StatusType.Error]: 'fa-solid fa-circle-exclamation',
    [StatusType.Success]: 'fa-solid fa-check-circle',
  };

  return (
    <div className={`mt-6 text-center text-sm sm:text-base p-3 bg-white/10 rounded-lg transition-colors duration-300 ${colorClasses[status.type]}`}>
      <i className={`${iconClasses[status.type]} mr-2`}></i>
      {status.text}
    </div>
  );
};

export default StatusDisplay;
