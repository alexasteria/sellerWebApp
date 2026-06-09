import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect, vi } from 'vitest';
import ProductCard from '../ProductCard';
import { ModelsProduct } from '@/backendApi';

// Mock the animations module to prevent actual DOM manipulation during tests
vi.mock('@/utils/animations', () => ({
    animateFlyingToCart: vi.fn(),
}));

// Mock getImageUrl to just return the string
vi.mock('@/utils/getImageUrl', () => ({
    getImageUrl: (url: string) => url,
}));

describe('ProductCard Component', () => {
    const mockProduct: ModelsProduct = {
        id: 1,
        categoryID: 1,
        title: 'Test Pizza',
        description: 'Delicious test pizza',
        discount: 10,
        img: 'test-img.png',
        variants: [
            { id: 1, cost: 500, value: '30cm', stock: 100 },
        ],
    };

    it('renders basic product information correctly', () => {
        render(
            <ProductCard
                product={mockProduct}
                onClick={vi.fn()}
                totalQuantity={0}
                onIncrement={vi.fn()}
                onDecrement={vi.fn()}
            />
        );

        // Check text content
        expect(screen.getByText('Test Pizza')).toBeInTheDocument();
        expect(screen.getByText('Delicious test pizza')).toBeInTheDocument();
        expect(screen.getByText('500.00₽')).toBeInTheDocument();
        expect(screen.getByText('-10%')).toBeInTheDocument();

        // Check image src
        const img = screen.getByAltText('Test Pizza') as HTMLImageElement;
        expect(img.src).toContain('test-img.png');
    });

    it('shows add button when totalQuantity is 0', () => {
        const onIncrement = vi.fn();
        const { container } = render(
            <ProductCard
                product={mockProduct}
                onClick={vi.fn()}
                totalQuantity={0}
                onIncrement={onIncrement}
                onDecrement={vi.fn()}
            />
        );

        // There should be no stepper (minus button)
        const minusIcon = container.querySelector('.lucide-minus');
        expect(minusIcon).not.toBeInTheDocument();

        // There should be a plus icon (add button)
        const plusIcon = container.querySelector('.lucide-plus');
        expect(plusIcon).toBeInTheDocument();

        // Click on the add button
        fireEvent.click(plusIcon!);
        expect(onIncrement).toHaveBeenCalledTimes(1);
    });

    it('shows stepper when totalQuantity > 0', () => {
        const onIncrement = vi.fn();
        const onDecrement = vi.fn();
        const { container } = render(
            <ProductCard
                product={mockProduct}
                onClick={vi.fn()}
                totalQuantity={3}
                onIncrement={onIncrement}
                onDecrement={onDecrement}
            />
        );

        // Text with quantity should exist
        expect(screen.getByText('3')).toBeInTheDocument();

        // Minus and plus icons should be present for stepper
        const minusIcon = container.querySelector('.lucide-minus');
        const plusIcon = container.querySelector('.lucide-plus');
        expect(minusIcon).toBeInTheDocument();
        expect(plusIcon).toBeInTheDocument();

        fireEvent.click(minusIcon!);
        expect(onDecrement).toHaveBeenCalledTimes(1);

        fireEvent.click(plusIcon!);
        expect(onIncrement).toHaveBeenCalledTimes(1);
    });

    it('calls onClick when the card is clicked', () => {
        const onClick = vi.fn();
        const { container } = render(
            <ProductCard
                product={mockProduct}
                onClick={onClick}
                totalQuantity={0}
                onIncrement={vi.fn()}
                onDecrement={vi.fn()}
            />
        );

        // Click on the entire card wrapper
        const card = container.firstChild as HTMLElement;
        fireEvent.click(card);

        expect(onClick).toHaveBeenCalledTimes(1);
    });
});
