import { render, screen } from '@testing-library/react';
import { Table } from './Table';
import type { ColumnDefinition } from './types';

interface TestData extends Record<string, unknown> {
    id: number;
    name: string;
    email: string;
}

describe('Table Component', () => {
    const columns: ColumnDefinition<TestData>[] = [
        {
            id: 'name',
            header: 'Name',
            accessor: 'name',
        },
        {
            id: 'email',
            header: 'Email',
            accessor: 'email',
        },
    ];

    const mockData: TestData[] = [
        { id: 1, name: 'John Doe', email: 'john@example.com' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
    ];

    describe('Loading State', () => {
        it('should display loading spinner when isLoading is true', () => {
            render(
                <Table
                    data={[]}
                    columns={columns}
                    isLoading={true}
                />
            );

            const spinner = screen.getByRole('loader');
            expect(spinner).toBeInTheDocument();
        });

        it('should not display data when loading', () => {
            render(
                <Table
                    data={mockData}
                    columns={columns}
                    isLoading={true}
                />
            );

            expect(screen.queryByText('John Doe')).not.toBeInTheDocument();
            expect(screen.queryByText('john@example.com')).not.toBeInTheDocument();
        });
    });

    describe('Error State', () => {
        it('should display error message when error is provided', () => {
            const error = new Error('Failed to fetch data');
            render(
                <Table
                    data={[]}
                    columns={columns}
                    error={error}
                    isLoading={false}
                />
            );

            expect(screen.getByText(/Error loading data: Failed to fetch data/i)).toBeInTheDocument();
        });
    });

    describe('Data State', () => {
        it('should display data correctly when data is provided', () => {
            render(
                <Table
                    data={mockData}
                    columns={columns}
                    isLoading={false}
                />
            );

            expect(screen.getByText('Name')).toBeInTheDocument();
            expect(screen.getByText('Email')).toBeInTheDocument();

            expect(screen.getByText('John Doe')).toBeInTheDocument();
            expect(screen.getByText('john@example.com')).toBeInTheDocument();
            expect(screen.getByText('Jane Smith')).toBeInTheDocument();
            expect(screen.getByText('jane@example.com')).toBeInTheDocument();
        });

        it('should display empty message when data array is empty', () => {
            render(
                <Table
                    data={[]}
                    columns={columns}
                    isLoading={false}
                    emptyMessage="No data available"
                />
            );

            expect(screen.getByText('No data available')).toBeInTheDocument();
        });

        it('should render table rows with correct data', () => {
            render(
                <Table
                    data={mockData}
                    columns={columns}
                    isLoading={false}
                    getRowKey={(row, index) => row.id || index}
                />
            );

            const rows = screen.getAllByRole('row');
            expect(rows).toHaveLength(3);
        });

        it('should handle row click when onRowClick is provided', () => {
            const handleRowClick = jest.fn();
            render(
                <Table
                    data={mockData}
                    columns={columns}
                    isLoading={false}
                    onRowClick={handleRowClick}
                    getRowKey={(row) => row.id}
                />
            );

            const rows = screen.getAllByRole('row');
            const firstDataRow = rows[1];

            firstDataRow.click();
            expect(handleRowClick).toHaveBeenCalledWith(mockData[0]);
        });
    });

    describe('Column Accessors', () => {
        it('should handle function accessors', () => {
            const columnsWithFunction: ColumnDefinition<TestData>[] = [
                {
                    id: 'fullName',
                    header: 'Full Name',
                    accessor: (row) => `${row.name} (${row.email})`,
                },
            ];

            render(
                <Table
                    data={mockData}
                    columns={columnsWithFunction}
                    isLoading={false}
                />
            );

            expect(screen.getByText('John Doe (john@example.com)')).toBeInTheDocument();
        });

        it('should display placeholder for null/undefined values', () => {
            const dataWithNull: TestData[] = [
                { id: 1, name: 'John Doe', email: null as unknown as string },
            ];

            render(
                <Table
                    data={dataWithNull}
                    columns={columns}
                    isLoading={false}
                />
            );

            expect(screen.getByText('—')).toBeInTheDocument();
        });
    });
});

