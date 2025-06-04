import Datatable from '@/components/datatable/Datatable';
import { Checkbox } from '@/components/ui/checkbox';
import VisibilityWrapper from '@/components/VisibilityWrapper';
import { useCard } from '@/modules/card/context/CardContext';
import { useAccount } from '@account/context/AccountContext'
import { format } from 'date-fns';
import React, { useMemo } from 'react'

const TransactionTable = () => {

    const { accounts } = useAccount();
    const { cards } = useCard();
    const remote = '/transactions';

    const columns = useMemo(() => [
        {
            id: "select",
            header: ({ table }) => (
                <Checkbox
                    checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                    }
                    onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                    aria-label="Select all"
                />
            ),
            cell: ({ row }) => (
                <Checkbox
                    checked={row.getIsSelected()}
                    onCheckedChange={(value) => row.toggleSelected(!!value)}
                    aria-label="Select row"
                />
            ),
            enableSorting: false,
            enableHiding: false,
            enableExport: false,
            searchable: false,
        },
        {
            id: "transactions.created_at",
            accessorKey: "created_at",
            header: "Date",
            cell: ({ row }) => format(new Date(row.original.created_at), "dd/MM/yyyy HH:mm"),
        },
        {
            id: "transactions.type",
            accessorKey: "type",
            header: "Type",
        },   
        {
            id: "transactions.status",
            accessorKey: "status",
            header: "Status",
        },  
        {
            id: "transactions.amount",
            accessorKey: "amount",
            header: "Amount",
            cell: ({ row }) => {
                const amount = parseFloat(row.original.amount);
                return (
                    <VisibilityWrapper>
                        {amount.toLocaleString("es-ES", { minimumFractionDigits: 2 })}€
                    </VisibilityWrapper>
                );
            },
        },  
        {
            id: "transactions.reference",
            accessorKey: "reference",
            header: "Reference",
        },
        {
            id: "transactions.origin_account_id",
            accessorKey: "origin_account_id",
            header: 'Origin account',
            multiSelectOptions: accounts,
            multiSelectDisplayField: "alias",
            enableMultiSelect: true,
            enableColumnFilter: true,
            cell: ({ row }) => row.original.origin_account_alias,
        },   
        {
            id: "transactions.destination_account_id",
            accessorKey: "destination_account_id",
            header: 'Destination account',
            multiSelectOptions: accounts,
            multiSelectDisplayField: "alias",
            enableMultiSelect: true,
            enableColumnFilter: true,
            cell: ({ row }) => row.original.destination_account_alias,
        },   
        {
            id: "transactions.card_id",
            accessorKey: "card_id",
            header: 'Card',
            multiSelectOptions: cards,
            multiSelectDisplayField: "alias",
            enableMultiSelect: true,
            enableColumnFilter: true,
            cell: ({ row }) => row.original.card_alias,
        },
        {
            id: 'transactions.concept',
            accessorKey: 'concept',
            header: 'Concept',
        }
    ], []);

    return (
        <div>
            <Datatable 
                columns={columns} 
                remote={remote}
                initialSorting={[{id: 'created_at', desc: true}]}   
            />
        </div>
    )
}

export default TransactionTable
