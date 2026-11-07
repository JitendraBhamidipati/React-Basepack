import { describe, it, expect } from '@jest/globals';
import counterReducer, {
  increment,
  decrement,
  incrementByAmount,
  reset,
} from '@/store/slices/counterSlice';

const initialState = { value: 0 };

describe('counterSlice', () => {
  it('returns the initial state when called with undefined', () => {
    expect(counterReducer(undefined, { type: '@@INIT' })).toEqual(initialState);
  });

  it('increment adds 1', () => {
    expect(counterReducer(initialState, increment()).value).toBe(1);
  });

  it('decrement subtracts 1', () => {
    expect(counterReducer(initialState, decrement()).value).toBe(-1);
  });

  it('incrementByAmount adds the given amount', () => {
    expect(counterReducer(initialState, incrementByAmount(5)).value).toBe(5);
    expect(counterReducer({ value: 10 }, incrementByAmount(-3)).value).toBe(7);
  });

  it('reset returns value to 0 regardless of current state', () => {
    expect(counterReducer({ value: 42 }, reset()).value).toBe(0);
    expect(counterReducer({ value: -7 }, reset()).value).toBe(0);
  });

  it('multiple actions compose correctly', () => {
    let state = counterReducer(undefined, increment());
    state = counterReducer(state, increment());
    state = counterReducer(state, incrementByAmount(3));
    state = counterReducer(state, decrement());
    // 0 + 1 + 1 + 3 - 1 = 4
    expect(state.value).toBe(4);
  });
});
