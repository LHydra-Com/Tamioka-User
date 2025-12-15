import React, { useState } from 'react';
import { View, Text, Pressable, Modal, ScrollView } from 'react-native';

interface SelectProps {
    options: string[];
    selected?: string;
    onSelect: (value: string) => void;
    placeholder?: string;
    className?: string;
}

export default function Select({
    options,
    selected,
    onSelect,
    placeholder = 'Select...',
    className = '',
}: SelectProps) {
    const [open, setOpen] = useState(false);

    return (
        <View className={`w-4/5 ${className}`}>
            <Pressable
                onPress={() => setOpen(true)}
                className="rounded-lg border border-gray-400 bg-white p-3 dark:border-neutral-600 dark:bg-neutral-900">
                <Text className="text-black dark:text-white">{selected || placeholder}</Text>
            </Pressable>

            <Modal transparent visible={open} animationType="fade">
                <Pressable
                    className="flex-1 items-center justify-center bg-black/30"
                    onPress={() => setOpen(false)}>
                    <View className="max-h-64 w-4/5 rounded-lg bg-white p-2 dark:bg-neutral-900">
                        <ScrollView>
                            {options.map((option, index) => (
                                <Pressable
                                    key={index}
                                    onPress={() => {
                                        onSelect(option);
                                        setOpen(false);
                                    }}
                                    className="border-b border-gray-200 p-3 dark:border-neutral-700">
                                    <Text className="text-black dark:text-white">{option}</Text>
                                </Pressable>
                            ))}
                        </ScrollView>
                    </View>
                </Pressable>
            </Modal>
        </View>
    );
}