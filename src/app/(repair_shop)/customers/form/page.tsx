import React from 'react'
import { getCustomer } from '@/lib/queries/getCustomer'
import { BackButton } from '@/components/BackButton'
import CustomerForm from './CustomerForm'

export default async function CustomerFormPage({
    searchParams
}: {
    searchParams: Promise<{ [key: string]: string | undefined }>
}) {
 
   
    try {
        const { customerId } = await searchParams

        // Edit customer form 
        if (customerId) {
            // Turn searchParams id - which is a string - into a number- as required in database
            const customer = await getCustomer(parseInt(customerId))

            if (!customer) {
                return (
                    <>
                        <h2 className="text-2xl mb-2">Customer ID #{customerId} not found</h2>
                        <BackButton title="Go Back" variant="default" />
                    </>
                )
            }
            
            // put customer form component 
            return <CustomerForm customer={customer} />
        } else {
            // new customer form component 
            return <CustomerForm />
        }

    } catch (error) {
        if (error instanceof Error) {
            
            throw error
        }
    }
  
}
