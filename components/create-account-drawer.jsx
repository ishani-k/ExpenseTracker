"use client";
import React, { useState } from 'react'
import { Drawer, DrawerClose, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from './ui/drawer';
import { Button } from './ui/button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { accountSchema } from '@/app/lib/schema';
import { Input } from './ui/input';
import { Radio, RadioIcon, RadioReceiver, RadioTowerIcon } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

const CreateAccountDrawer = ({children}) => {

    const [open, setOpen] = useState(false)

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        watch, 
        reset
    } = useForm({
        resolver: zodResolver(accountSchema),
        defaultValues: {
            name: "",
            type: "CURRENT",
            balance: "",
            isDefault: false
        }
    })

  return (
    <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>{children}</DrawerTrigger>
        <DrawerContent>
            <DrawerHeader>
                <DrawerTitle>Create New Account</DrawerTitle>
            </DrawerHeader>

            <div className='px-4 pb-4'>
                <form className='space-y-4'>
                    <div className='space-y-2'>
                        <label htmlFor="name" className='text-sm font-medium'>Account Name</label>
                        <Input id="name" placeholder="e.g, Main Checking" 
                        {...register("name")} />
                        {errors.name && (
                            <p className='text-sm text-red-700'>{errors.name.message}</p>
                        )}
                    </div>
                    <div className='space-y-2'>
                        <label htmlFor="type" className='text-sm font-medium'>Account Type</label>
                        <Select>
                          <SelectTrigger id="type">
                            <SelectValue placeholder="Select Type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="CURRENT">Current</SelectItem>
                            <SelectItem value="SAVINGS">Savings</SelectItem>
                          </SelectContent>
                        </Select>
                    </div>
                </form>
            </div>
        </DrawerContent>
    </Drawer>
  )
}

export default CreateAccountDrawer 