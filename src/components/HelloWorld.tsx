import React from 'react';
import { HelloWorldProps } from './HelloWorld.types';

const HelloWorld = ({ name }: HelloWorldProps): React.ReactElement  => (
    <h1>Hello {name ?? 'World'}</h1>
);

export default HelloWorld;