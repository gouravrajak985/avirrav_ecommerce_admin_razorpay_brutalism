'use client';

import { useParams, useRouter } from 'next/navigation';

import { DataTable } from '@/components/ui/data-table';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { ApiList } from '@/components/ui/api-list';

import { CustomerColumn, columns } from './columns';

interface CustomersClientProps {
  data: CustomerColumn[];
}

export const CustomersClient: React.FC<CustomersClientProps> = ({ data }) => {
  const params = useParams();
  const router = useRouter();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Customers (${data.length})`}
          description="Manage customers for your store"
        />
      </div>
      <Separator />
      <DataTable 
        searchKey="fullName" 
        columns={columns} 
        data={data} 
        entityName="customers"
        storeId={Array.isArray(params.storeId) ? params.storeId[0] : params.storeId}
      />
      <Heading title="API" description="API Calls for Customers" />
      <Separator />
      <ApiList entityName="customers" entityIdName="customerId" />
    </>
  );
};