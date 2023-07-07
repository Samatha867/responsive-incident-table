import { FunctionComponent } from 'react';
import * as Icons from './icons';

interface Props {
  name: string;
  className?: string;
  title?: string;
}

const Icon: FunctionComponent<Props> = ({
  name,
  className = '',
  title,
  ...rest
}) => {
  const IconComponent = Icons[name];

  return <IconComponent className={className} title={title} {...rest} />;
};

export default Icon;
