import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface CounterState {
  value: number;
}

const initialState: CounterState = {
  value: 0,
};

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment(state) {
      state.value += 1;
    },
    decrement(state) {
      state.value -= 1;
    },
    incrementByAmount(state, action: PayloadAction<number>) {
      state.value += action.payload;
    },
    reset(state) {
      state.value = 0;
    },
  },
});

export const { increment, decrement, incrementByAmount, reset } = counterSlice.actions;

// ── Selectors ─────────────────────────────────────────────────────────────────
// Stable named selectors keep component code clean and are trivial to wrap with
// createSelector when derived data is needed later.
import type { RootState } from '@/store/store';
export const selectCount = (state: RootState) => state.counter.value;

export default counterSlice.reducer;
