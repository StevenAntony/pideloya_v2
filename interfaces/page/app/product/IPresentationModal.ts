interface IPresentationModal {
    key: string;
    unit: string;
    price: number;
    amount: number;
}

interface EditablePresentationCellProps extends React.HTMLAttributes<HTMLElement> {
    editing: boolean;
    dataIndex: string;
    title: any;
    inputType: 'number' | 'text';
    record: IPresentationModal;
    index: number;
    children: React.ReactNode;
}