import React, { useEffect, useMemo, useRef, useState } from 'react';
import { KeyboardAvoidingView, Platform, TextInput, View, Pressable, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Text from '../components/ui/Text';
import Button from '../components/ui/Button';

type Step = 'welcome' | 'enter' | 'code';

function digitsOnly(value: string) {
    return value.replace(/\D/g, '');
}

function formatUsPhone(input: string) {
    const digits = digitsOnly(input).slice(0, 10);
    const a = digits.slice(0, 3);
    const b = digits.slice(3, 6);
    const c = digits.slice(6, 10);
    if (digits.length <= 3) return a;
    if (digits.length <= 6) return `(${a}) ${b}`;
    return `(${a}) ${b}-${c}`;
}

function isValidEmail(value: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

function isValidPhone(value: string) {
    return digitsOnly(value).length === 10;
}

export default function AuthFlow({ onComplete }: { onComplete?: () => void }) {
    const [step, setStep] = useState<Step>('welcome');
    const [identifier, setIdentifier] = useState('');
    const [identifierTouched, setIdentifierTouched] = useState(false);
    const [code, setCode] = useState('');
    const [sending, setSending] = useState(false);
    const [resendTimer, setResendTimer] = useState(0);
    const otpRef = useRef<TextInput>(null);

    useEffect(() => {
        let t: ReturnType<typeof setTimeout> | undefined;
        if (resendTimer > 0) {
            t = setTimeout(() => setResendTimer((s) => Math.max(0, s - 1)), 1000);
        }
        return () => t && clearTimeout(t);
    }, [resendTimer]);

    const isEmail = useMemo(() => identifier.trim().includes('@'), [identifier]);
    const formattedPhone = useMemo(() => formatUsPhone(identifier), [identifier]);
    const isIdentifierValid = useMemo(() => {
        if (!identifier.trim()) return false;
        return isEmail ? isValidEmail(identifier) : isValidPhone(identifier);
    }, [identifier, isEmail]);

    const identifierError = useMemo(() => {
        if (!identifierTouched) return '';
        if (!identifier.trim()) return '';
        if (isIdentifierValid) return '';
        return isEmail ? 'Invalid email address' : 'Invalid Phone number';
    }, [identifierTouched, identifier, isIdentifierValid, isEmail]);

    const onClose = () => onComplete?.();
    const onBack = () => {
        if (step === 'enter') setStep('welcome');
        if (step === 'code') setStep('enter');
    };

    const start = () => setStep('enter');

    const continueToCode = () => {
        setIdentifierTouched(true);
        if (!isIdentifierValid) return;
        setSending(true);
        setTimeout(() => {
            setSending(false);
            setResendTimer(60);
            setStep('code');
            setTimeout(() => otpRef.current?.focus(), 50);
        }, 500);
    };

    const verify = () => {
        if (code.length < 6) return;
        setSending(true);
        setTimeout(() => {
            setSending(false);
            onComplete?.();
        }, 600);
    };

    const resend = () => {
        if (sending || resendTimer > 0) return;
        setSending(true);
        setTimeout(() => {
            setSending(false);
            setResendTimer(60);
        }, 500);
    };

    const headerTitle = step === 'welcome' ? 'Sign up' : 'Sign up with phone number';

    return (
        <SafeAreaView className="flex-1 bg-tertiary dark:bg-neutral-950">
            <KeyboardAvoidingView
                className="flex-1"
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 12 : 0}
            >
                {/* Header */}
                <View className="px-4 pt-2">
                    <View className="h-10 flex-row items-center justify-between">
                        <View className="w-10 h-10 items-start justify-center">
                            {step !== 'welcome' && (
                                <Pressable
                                    onPress={onBack}
                                    accessibilityRole="button"
                                    accessibilityLabel="Back"
                                    className="h-10 w-10 items-center justify-center"
                                >
                                    <Text className="text-2xl text-zinc-700 dark:text-zinc-200">‹</Text>
                                </Pressable>
                            )}
                        </View>

                        <Text size="sm" color="#9CA3AF">
                            {headerTitle}
                        </Text>

                        <Pressable
                            onPress={onClose}
                            accessibilityRole="button"
                            accessibilityLabel="Close"
                            className="h-10 w-10 items-center justify-center"
                        >
                            {/* <Text className="text-2xl text-zinc-700 dark:text-zinc-200">×</Text> */}
                        </Pressable>
                    </View>
                </View>

                {/* Content */}
                <ScrollView
                    className="flex-1 px-6"
                    contentContainerStyle={{ flexGrow: 1 }}
                    keyboardShouldPersistTaps="handled"
                >
                    {step === 'welcome' && (
                        <View className="flex-1">
                            <View className="flex-1 items-center justify-center">
                                <Image source={require('../assets/logo.png')} style={{ width: 96, height: 96, marginBottom: 12 }} />
                                {/* <Text variant="title" weight="bold" size={34}>
                                    TAIMAKO
                                </Text> */}
                            </View>

                            <View className="pb-10">
                                <Text weight="medium" center className="mb-2">
                                    Welcome
                                </Text>
                                <Text center size="sm" color="#6B7280" className="mb-6">
                                    Create an account or login to your existing account
                                </Text>

                                <Button
                                    title="Email Or Phone Number"
                                    onPress={start}
                                    variant="secondary"
                                    className="rounded-2xl"
                                />

                                <View className="flex-row items-center my-5">
                                    <View className="flex-1 h-[1px] bg-neutral-200 dark:bg-neutral-800" />
                                    <Text size="sm" color="#9CA3AF" className="mx-3">
                                        or
                                    </Text>
                                    <View className="flex-1 h-[1px] bg-neutral-200 dark:bg-neutral-800" />
                                </View>

                                <Button
                                    title="Continue with Google"
                                    onPress={() => onComplete?.()}
                                    variant="outline"
                                    className="rounded-2xl"
                                />

                                <View className="h-3" />

                                <Button
                                    title="Continue with Apple"
                                    onPress={() => { }}
                                    variant="primary"
                                    className="rounded-2xl"
                                />
                            </View>
                        </View>
                    )}

                    {step === 'enter' && (
                        <View className="flex-1">
                            <View className="flex-1 items-center justify-center">
                                <Image source={require('../assets/logo.png')} style={{ width: 96, height: 96, marginBottom: 12 }} />
                                {/* <Text variant="title" weight="bold" size={34}>
                                    TAIMAKO
                                </Text> */}
                            </View>

                            <View className="pb-10">
                                <Text weight="medium" center className="mb-2">
                                    Continue with Phone or Email
                                </Text>
                                <Text center size="sm" color="#6B7280" className="mb-5">
                                    Login or create an account
                                </Text>

                                <Text size="sm" color="#6B7280" className="mb-2">
                                    Enter your Phone or Email
                                </Text>

                                <View
                                    className={`rounded-xl px-4 py-3 bg-neutral-100 dark:bg-neutral-900 ${identifierError ? 'border border-red-400' : ''}`}
                                >
                                    <TextInput
                                        value={isEmail ? identifier : formattedPhone}
                                        onFocus={() => setIdentifierTouched(true)}
                                        onChangeText={(v) => {
                                            if (v.includes('@')) {
                                                setIdentifier(v);
                                            } else {
                                                setIdentifier(digitsOnly(v));
                                            }
                                        }}
                                        placeholder="Enter Phone number or Email"
                                        placeholderTextColor="#9CA3AF"
                                        keyboardType={isEmail ? 'email-address' : 'phone-pad'}
                                        autoCapitalize="none"
                                        returnKeyType="done"
                                        onSubmitEditing={continueToCode}
                                        className="text-base text-zinc-900 dark:text-tertiary"
                                    />
                                </View>

                                {identifierError ? (
                                    <Text size="sm" color="#EF4444" className="mt-2">
                                        {identifierError}
                                    </Text>
                                ) : null}

                                <View className="h-6" />

                                <Button
                                    title={sending ? 'Continue…' : 'Continue'}
                                    onPress={continueToCode}
                                    variant="secondary"
                                    disabled={sending || !identifier.trim()}
                                    className="rounded-2xl"
                                />
                            </View>
                        </View>
                    )}

                    {step === 'code' && (
                        <View className="flex-1">
                            <View className="flex-1 items-center justify-center">
                                <Image source={require('../assets/logo.png')} style={{ width: 96, height: 96, marginBottom: 12 }} />
                                {/* <Text variant="title" weight="bold" size={34}>
                                    TAIMAKO
                                </Text> */}
                            </View>

                            <View className="pb-10">
                                <Text weight="medium" center className="mb-2">
                                    Enter Verification Code
                                </Text>

                                <View className="items-center mb-5">
                                    <Text size="sm" color="#6B7280">
                                        We sent a verification code to your phone number
                                    </Text>
                                    <View className="flex-row items-center mt-2">
                                        <Text size="sm" weight="medium">
                                            {isEmail ? identifier.trim() : `+1${digitsOnly(identifier).length ? ' ' : ''}${formatUsPhone(identifier)}`}
                                        </Text>
                                        <Pressable
                                            onPress={() => setStep('enter')}
                                            accessibilityRole="button"
                                            accessibilityLabel="Edit"
                                            className="ml-2"
                                        >
                                            <Text size="sm" weight="medium" className="text-secondary">
                                                Edit
                                            </Text>
                                        </Pressable>
                                    </View>
                                </View>

                                {/* OTP boxes */}
                                <Pressable
                                    onPress={() => otpRef.current?.focus()}
                                    accessibilityRole="button"
                                    accessibilityLabel="Verification code input"
                                >
                                    <View className="flex-row justify-between">
                                        {Array.from({ length: 6 }).map((_, i) => {
                                            const active = i === Math.min(code.length, 5);
                                            const filled = Boolean(code[i]);
                                            return (
                                                <View
                                                    key={i}
                                                    className={`h-12 w-12 rounded-lg items-center justify-center bg-neutral-100 dark:bg-neutral-900 border ${filled ? 'border-green-500' : active ? 'border-secondary' : 'border-neutral-200 dark:border-neutral-800'}`}
                                                >
                                                    <Text weight="medium" size={18}>
                                                        {code[i] || ''}
                                                    </Text>
                                                </View>
                                            );
                                        })}
                                    </View>

                                    <TextInput
                                        ref={otpRef}
                                        value={code}
                                        onChangeText={(v) => setCode(digitsOnly(v).slice(0, 6))}
                                        keyboardType="number-pad"
                                        maxLength={6}
                                        autoFocus
                                        caretHidden
                                        className="absolute opacity-0"
                                    />
                                </Pressable>

                                <View className="h-6" />

                                <Button
                                    title={sending ? 'Verify…' : 'Verify And Continue'}
                                    onPress={verify}
                                    variant="secondary"
                                    disabled={sending || code.length < 6}
                                    className="rounded-2xl"
                                />

                                <View className="mt-4 flex-row items-center justify-center">
                                    <Text size="sm" color="#6B7280">
                                        Didn't receive any code?
                                    </Text>
                                    <Pressable
                                        onPress={resend}
                                        disabled={sending || resendTimer > 0}
                                        className="ml-1"
                                    >
                                        <Text
                                            size="sm"
                                            weight="medium"
                                            className={resendTimer > 0 ? 'text-zinc-400' : 'text-secondary'}
                                        >
                                            {resendTimer > 0 ? `Resend code (${resendTimer}s)` : 'Resend code'}
                                        </Text>
                                    </Pressable>
                                </View>
                            </View>
                        </View>
                    )}
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}
