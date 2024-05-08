import { REACT_ELEMENT_TYPE } from 'shared/ReactSymbols';
import { Type, Ref, Key, Props, ReactElementType, ElementType } from 'shared/ReactTypes';

const ReactElement = function (type: Type, key: Key, ref: Ref, props: Props): ReactElementType {
  const element = {
    $$typeof: REACT_ELEMENT_TYPE,
    type,
    key,
    ref,
    props,
    __mark: 'erxiao'
  };
  return element;
};

/**
 * @param type 元素类型
 * @param config 元素配置
 * @param children 子元素
 */
export const jsx = (type: ElementType, config: any, ...children: any) => {
  let key: Key = null;
  let ref: Ref = null;
  const props: Props = {};

  // 1. 拿到当前组件的 key、ref、props
  for (const prop in config) {
    const val = config[prop];
    // key 也是 props 的某一种
    if (prop === 'key') {
      if (val !== undefined) {
        key = '' + val;
      }
      continue;
    }
    // ref 也是 props 的一种
    if (prop === 'ref') {
      if (val !== undefined) {
        ref = val;
      }
      continue;
    }
    if ({}.hasOwnProperty.call(config, prop)) {
      props[prop] = val;
    }
  }
  const childrenLength = children.length;
  if (childrenLength) {
    if (childrenLength === 1) {
      props.children = children[0];
    } else {
      props.children = children;
    }
  }

  // 2. 返回一个 ReactElement 对象
  return ReactElement(type, key, ref, props);
};

export const jsxDEV = (type: ElementType, config: any) => {
  let key: Key = null;
  let ref: Ref = null;
  const props: Props = {};
  for (const prop in config) {
    const val = config[prop];
    if (prop === 'key') {
      if (val !== undefined) {
        key = '' + val;
      }
      continue;
    }
    if (prop === 'ref') {
      if (val !== undefined) {
        ref = val;
      }
      continue;
    }
    if ({}.hasOwnProperty.call(config, prop)) {
      props[prop] = val;
    }
  }
  return ReactElement(type, key, ref, props);
};
