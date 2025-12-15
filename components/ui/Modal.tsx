import { Text, Pressable, Modal as RNModal } from 'react-native';
import { ReactNode } from 'react';
import { BlurView } from 'expo-blur';

interface ModalProps {
    visible: boolean;
    title?: string;
    children?: ReactNode;
    onClose: () => void;
    className?: string;
}

export function Modal({ visible, title, children, onClose, className = '' }: ModalProps) {
    return (
        <RNModal visible={visible} transparent animationType="fade">
            {/* Outer Pressable to detect taps outside */}
            <Pressable onPress={onClose} className="flex-1 items-center justify-center">
                {/* Blurred background */}
                <BlurView intensity={100} tint="dark" className="absolute inset-0" />

                {/* Modal content */}
                <Pressable
                    onPress={(e) => e.stopPropagation()} // prevent closing when tapping inside
                    className={`w-4/5 rounded-xl bg-white p-6 dark:bg-neutral-900 ${className}`}>
                    {title && (
                        <Text className="mb-4 text-lg font-bold text-black dark:text-white">{title}</Text>
                    )}
                    {children}
                    <Pressable
                        onPress={onClose}
                        className="mt-4 rounded bg-gray-300 px-4 py-2 dark:bg-neutral-700">
                        <Text className="text-center text-gray-700 dark:text-gray-100">Close</Text>
                    </Pressable>
                </Pressable>
            </Pressable>
        </RNModal>
    );
}