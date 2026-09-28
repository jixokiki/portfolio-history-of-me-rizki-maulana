export type Variant = 'roll' | 'shadow' | 'underline' | 'blur' | 'mask';

const ORDER: Variant[] = ['roll', 'shadow', 'underline', 'blur', 'mask'];

export function nextVariant(i: number): Variant {
  return ORDER[i % ORDER.length];
}
