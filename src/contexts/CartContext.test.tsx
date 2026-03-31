import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { CartProvider, useCart } from './CartContext';
import { ProductProvider } from './ProductContext';
import { ModelsProduct } from '@/backendApi';
import React from 'react';

// Mock tg-telegram to bypass haptic issues
vi.mock('@/hooks/useTelegram', () => ({
  triggerHaptic: vi.fn(),
}));

const mockProduct: ModelsProduct = {
  id: 1,
  title: 'Pizza Margherita',
  price: 500,
  variants: [
    { id: 101, value: "Standard", cost: 500 }
  ],
  is_active: true,
};

// Mock ProductContext
vi.mock('./ProductContext', async (importOriginal) => {
  const mod = await importOriginal<typeof import('./ProductContext')>();
  return {
    ...mod,
    useProducts: () => ({
      products: [mockProduct],
    }),
  };
});

describe('CartContext Integration', () => {
  it('should add items to cart and calculate totals', () => {
    // To test CartContext we only need CartProvider because ProductProvider is mocked
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <CartProvider>{children}</CartProvider>
    );

    const { result } = renderHook(() => useCart(), { wrapper });

    // Initial state
    expect(result.current.cartItemCount).toBe(0);
    expect(result.current.cartTotal).toBe(0);

    // Add item
    act(() => {
      result.current.increment(mockProduct, 101);
    });

    expect(result.current.cartItemCount).toBe(1);
    expect(result.current.cartTotal).toBe(500);

    // Add same item again
    act(() => {
      result.current.increment(mockProduct, 101);
    });

    expect(result.current.cartItemCount).toBe(2);
    expect(result.current.cartTotal).toBe(1000);

    // Remove item
    act(() => {
      result.current.decrement(mockProduct, 101);
    });

    expect(result.current.cartItemCount).toBe(1);
    expect(result.current.cartTotal).toBe(500);

    // Clear cart
    act(() => {
      result.current.clearCart();
    });

    expect(result.current.cartItemCount).toBe(0);
    expect(result.current.cartTotal).toBe(0);
  });
});
