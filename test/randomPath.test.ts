import { randomPath } from "@/lib/helpers";
import { expect, test } from 'vitest'

test("Reapeats positions in 2 dimensions", () => {
    const length = 4;
    const width = 2;
    const step = 1;
    const result = randomPath(length, width, step);

    expect(result.length).toBe(width + 1);

    // inner array size
    result.forEach(row => {
        expect(row.length).toBe(length + 1);

        row.forEach(cell => {
            // pos
            expect(cell.pos.length).toBe(3);
            cell.pos.forEach(v => {
                expect(v).toBeGreaterThanOrEqual(0);
                expect(v).toBeLessThanOrEqual(2);
            });

            // scale
            expect(cell.scale).toBeGreaterThanOrEqual(0.5);
            expect(cell.scale).toBeLessThanOrEqual(1.2);

            // rotation
            expect(cell.rotation.length).toBe(3);
            cell.rotation.forEach(r => {
                expect(typeof r).toBe('number');
            });
        });
    });
})