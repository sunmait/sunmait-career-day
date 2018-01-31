import IStore from 'types/index';

const defaultState: IStore = {};

export default function (state = defaultState, { type, payload }: {type: string, payload: any}) {
  switch (type) {
    default:
      return state;
  }
}
