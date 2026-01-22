'use client';

import { useMemo, useRef, useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import SimpleReactValidator from 'simple-react-validator';
import { updateAdminSettings } from '@/utils/graphql/setting/action';
import { forError, forSuccess } from '@/utils/common-service';

type DurationKey = '30' | '60';

type SettingsForm = {
    default_admin_token: number | '';
    session_amount: string;
    cancellation_window: string;
    reschedule_window: string;
};

// helpers to map between string format and UI editing
const parseSessionAmountString = (s: string): Record<DurationKey, number> => {
    try {
        // expected format: "{30:50,60:100}"
        const inner = s.trim().replace(/^\{|\}$/g, '');
        const parts = inner ? inner.split(',') : [];
        const map: Partial<Record<DurationKey, number>> = {};
        for (const p of parts) {
            const [k, v] = p.split(':').map(x => x.trim());
            if ((k === '30' || k === '60') && !Number.isNaN(Number(v))) {
                map[k] = Math.max(0, Number(v));
            }
        }
        return {
            '30': map['30'] ?? 50,
            '60': map['60'] ?? 100,
        };
    } catch {
        return { '30': 50, '60': 100 };
    }
};

const buildSessionAmountString = (m: Record<DurationKey, number>) => `{30:${Number(m['30'])},60:${Number(m['60'])}}`;

type WindowJson = { hours: number; minutes: number };

const parseWindowJson = (s: string): WindowJson => {
    try {
        const obj = JSON.parse(s ?? '{}');
        const hours = Number.isFinite(obj?.hours) ? Math.max(0, Math.floor(obj.hours)) : 0;
        const minutes = Number.isFinite(obj?.minutes) ? Math.max(0, Math.min(59, Math.floor(obj.minutes))) : 0;
        return { hours, minutes };
    } catch {
        return { hours: 0, minutes: 0 };
    }
};

const buildWindowJson = (w: WindowJson): string =>
    JSON.stringify({ hours: Math.max(0, Math.floor(w.hours)), minutes: Math.max(0, Math.min(59, Math.floor(w.minutes))) });


const Setting = ({ settingsData }: { settingsData: any }) => {

    const DEFAULT_FORM = {
        default_admin_token: settingsData?.default_admin_token,
        session_amount: settingsData?.session_amount?.toString() ?? '{30:50,60:100}',
        reschedule_time: null,
        cancellation_window: JSON.stringify(settingsData?.cancellation_time ?? { hours: 10, minutes: 0 }),
        reschedule_window: JSON.stringify(settingsData?.reschedule_time ?? { hours: 10, minutes: 0 }),
    };
    const [form, setForm] = useState<SettingsForm>(DEFAULT_FORM);
    const [selectedDuration, setSelectedDuration] = useState<DurationKey>('30');
    const [submitting, setSubmitting] = useState(false);
    const [, forceRerender] = useState(0);

    const validator = useRef(
        new SimpleReactValidator({
            autoForceUpdate: { forceUpdate: () => forceRerender(x => x + 1) },
            element: (message: string) => <div className="text-sm text-red-500 mt-1">{message}</div>,
        })
    );

    const tokensByDuration = useMemo(() => form.session_amount ? parseSessionAmountString(form.session_amount) : { '30': 50, '60': 100 }, [form.session_amount]);
    const baseTokens = tokensByDuration[selectedDuration];

    const cancellationWindow = useMemo(() => parseWindowJson(form.cancellation_window), [form.cancellation_window]);
    const rescheduleWindow = useMemo(() => parseWindowJson(form.reschedule_window), [form.reschedule_window]);

    const setBaseTokens = (value: number) => {
        const next = { ...tokensByDuration, [selectedDuration]: Math.max(0, Number(value) || 0) } as Record<DurationKey, number>;
        setForm(prev => ({ ...prev, session_amount: buildSessionAmountString(next) }));
    };

    const updateWindow = (
        windowKey: "cancellation_window" | "reschedule_window",
        part: "hours" | "minutes",
        value: string
    ) => {
        const numeric = Number(value.replace(/[^\d]/g, ""));
        if (Number.isNaN(numeric)) return;
        const current = parseWindowJson(form[windowKey]);
        const next: WindowJson = {
            hours: part === "hours" ? Math.max(0, Math.floor(numeric)) : current.hours,
            minutes: part === "minutes"
                ? Math.max(0, Math.min(59, Math.floor(numeric)))
                : current.minutes,
        };
        setForm((prev) => ({
            ...prev,
            [windowKey]: buildWindowJson(next),
        }));
    };

    const onSubmit = async () => {
        if (!validator.current.allValid()) {
            validator.current.showMessages();
            forceRerender(x => x + 1);
            return;
        }

        setSubmitting(true);
        try {

            const input = {
                default_admin_token: Number(form.default_admin_token),
                session_amount: form.session_amount,
                reschedule_time: rescheduleWindow,
                cancellation_time: cancellationWindow
            };

            const response = await updateAdminSettings({ input });
            if (response?.adminUpdateSettings?.success) {
                forSuccess("Settings updated successfully.");
            } else {
                forError("Failed to update settings. Please try again.");
            }

        } catch (e) {
            console.error(e);
        } finally {
            setSubmitting(false);
        }
    };


    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-8">
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold">Settings</h1>
                            <p className="text-muted-foreground">View and manage all settings</p>
                        </div>
                    </div>

                    <Card>
                        <CardHeader>
                            <CardTitle>Signup Tokens</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <Label htmlFor="manual-tokens">Set default tokens</Label>
                            <Input
                                id="manual-tokens"
                                inputMode="numeric"
                                value={form.default_admin_token}
                                onChange={(e) => {
                                    const v = e.target.value.replace(/[^\d]/g, '');
                                    setForm(prev => ({ ...prev, default_admin_token: v === '' ? '' : Number(v) }));
                                }}
                                placeholder="e.g., 1000"
                            />
                            {validator.current.message('default_admin_token', form.default_admin_token, 'required|numeric')}
                            <p className="text-xs text-muted-foreground">
                                These bonus tokens will be credited to the student's wallet when a new user is registered.
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Session Duration & Tokens</CardTitle>
                            <CardDescription>Select a session duration and set tokens for it.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="session-duration">Session duration</Label>
                                    <Select
                                        value={selectedDuration}
                                        onValueChange={(val) => setSelectedDuration(val as DurationKey)}
                                    >
                                        <SelectTrigger id="session-duration" className="w-full">
                                            <SelectValue placeholder="Select duration" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="30">30 minutes — {tokensByDuration['30']} tokens</SelectItem>
                                            <SelectItem value="60">60 minutes — {tokensByDuration['60']} tokens</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <Label>Tokens for selected duration</Label>
                                    <Input
                                        id="base-tokens"
                                        inputMode="numeric"
                                        value={baseTokens}
                                        onChange={(e) => setBaseTokens(e.target.value === '' ? 0 : Number(e.target.value))}
                                        placeholder="e.g., 50"
                                    />
                                </div>
                            </div>

                            {/* hidden field used for validator display and final payload */}
                            <input
                                type="hidden"
                                value={form.session_amount}
                                readOnly
                            />
                            {validator.current.message('session_amount', form.session_amount, 'required')}

                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Cancellation & Rescheduling</CardTitle>
                            <CardDescription>
                                Configure time windows. Refunds apply if action happens before the specified time.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label>Cancellation window (before start)</Label>
                                    <div className="grid grid-cols-2 gap-3">
                                        <div className="space-y-1">
                                            <Label htmlFor="cancel-hours" className="text-xs text-muted-foreground">Hours</Label>
                                            <Input
                                                id="cancel-hours"
                                                inputMode="numeric"
                                                value={cancellationWindow.hours}
                                                onChange={(e) => updateWindow("cancellation_window", 'hours', e.target.value)}
                                                placeholder="e.g., 24"
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <Label htmlFor="cancel-minutes" className="text-xs text-muted-foreground">Minutes</Label>
                                            <Input
                                                id="cancel-minutes"
                                                inputMode="numeric"
                                                value={cancellationWindow.minutes}
                                                onChange={(e) => updateWindow("cancellation_window", 'minutes', e.target.value)}
                                                placeholder="e.g., 30"
                                            />
                                        </div>
                                    </div>
                                    <p className="text-xs text-muted-foreground">
                                        Refund applicable if session is cancelled {cancellationWindow.hours} hours and {cancellationWindow.minutes} minutes before start.
                                    </p>
                                </div>

                                <div className="space-y-2">
                                    <Label>Rescheduling window (before start)</Label>
                                    <div className="grid grid-cols-2 gap-3">
                                        <div className="space-y-1">
                                            <Label htmlFor="reschedule-hours" className="text-xs text-muted-foreground">Hours</Label>
                                            <Input
                                                id="reschedule-hours"
                                                inputMode="numeric"
                                                value={rescheduleWindow.hours}
                                                onChange={(e) => updateWindow("reschedule_window", 'hours', e.target.value)}
                                                placeholder="e.g., 12"
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <Label htmlFor="reschedule-minutes" className="text-xs text-muted-foreground">Minutes</Label>
                                            <Input
                                                id="reschedule-minutes"
                                                inputMode="numeric"
                                                value={rescheduleWindow.minutes}
                                                onChange={(e) => updateWindow("reschedule_window", 'minutes', e.target.value)}
                                                placeholder="e.g., 15"
                                            />
                                        </div>
                                    </div>
                                    <p className="text-xs text-muted-foreground">

                                        Rescheduleding is  applicable if session is rescheduled {rescheduleWindow.hours} hours and {rescheduleWindow.minutes} minutes before start.
                                    </p>
                                </div>
                            </div>


                        </CardContent>
                        <CardFooter className="justify-end">
                            <Button type="button" variant="default" disabled={submitting} onClick={onSubmit}>
                                {submitting ? 'Saving...' : 'Save '}
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default Setting;