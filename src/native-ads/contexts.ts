import React from 'react';

export type ComponentOrClass =
  | React.ComponentClass<unknown>
  | React.Component<unknown, unknown>;

type Receiver = (c: ComponentOrClass) => void;
export interface MultipleRegisterablesContextValueType {
  unregister: Receiver;
  register: Receiver;
}

export interface RegisterableContextValueType {
  register: Receiver;
  unregister: () => void;
}

export type TriggerableContextValueType = MultipleRegisterablesContextValueType;
export type AdIconViewContextValueType = RegisterableContextValueType;
export type MediaViewContextValueType = RegisterableContextValueType;
export type AdChoicesViewContextValueType = string;

const defaultValue = {
  register: () => {
    throw new Error('Stub!');
  },
  unregister: () => {
    throw new Error('Stub!');
  }
};

export const TriggerableContext = React.createContext<
  TriggerableContextValueType
>(defaultValue);
export const MediaViewContext = React.createContext<MediaViewContextValueType>(
  defaultValue
);

export const AdIconViewContext = React.createContext<
  AdIconViewContextValueType
>(defaultValue);

export const AdChoicesViewContext = React.createContext<
  AdChoicesViewContextValueType
>('');
