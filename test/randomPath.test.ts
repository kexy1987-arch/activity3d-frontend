import { pathPos } from '@/lib/helpers';
import { expect, test } from 'vitest'

test("Create positions in 2 dimensions", () => {

    const length = 15
    const start2 = 47
    const result = pathPos({ start: 0, start1: 0, start2, step: 0, step1: 0, step2: 1, length });

    expect(result.length).toBe(length);
    expect(result[result.length - 1 ][2]).toBe(length + start2 - 1);
})