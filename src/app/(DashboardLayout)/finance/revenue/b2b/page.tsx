'use client'
import PageContainer from "@/app/components/container/PageContainer";
import Breadcrumb from "@/app/(DashboardLayout)/layout/shared/breadcrumb/Breadcrumb";
import B2BPaymentsApp from "../b2b-payments/components/B2BPaymentsApp";

const B2B = () => {
  return (
    <PageContainer title="B2B Payments" description="Revenue from enterprise waste collection contracts">
      <Breadcrumb title="B2B Payments" subtitle="Track enterprise client revenue and collections" />
      <B2BPaymentsApp />
    </PageContainer>
  );
};

export default B2B;
