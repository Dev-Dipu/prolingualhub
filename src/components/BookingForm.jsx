"use client";

import { useState } from "react";
import PhoneInput from "react-phone-input-2";
import { isValidPhoneNumber } from "libphonenumber-js";
import "react-phone-input-2/lib/style.css";

import FormInput from "./FormInput";
import FormSelect from "./FormSelect";
import FormTextarea from "./FormTextarea";
import PrimaryButton from "./PrimaryButton";
import { useLanguage } from "@/context/LanguageContext";

export default function BookingForm({ onSubmit, isLoading = false }) {
    const { t } = useLanguage();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        englishLevel: "",
        description: "",
    });

    const [errors, setErrors] = useState({});

    const englishLevels = [
        { value: "beginner", label: t.booking.levels.beginner },
        { value: "elementary", label: t.booking.levels.elementary },
        { value: "intermediate", label: t.booking.levels.intermediate },
        {
            value: "upper-intermediate",
            label: t.booking.levels.upper_intermediate,
        },
        { value: "advanced", label: t.booking.levels.advanced },
    ];

    // ---------- VALIDATION (NEAT & READABLE) ----------
    const validate = () => {
        const e = {};

        if (!formData.name.trim()) {
            e.name = t.booking.validations.name;
        }

        if (!formData.email.trim()) {
            e.email = t.booking.validations.emailRequired;
        } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
        ) {
            e.email = t.booking.validations.emailInvalid;
        }

        if (!formData.phone) {
            e.phone = t.booking.validations.phone;
        } else if (!isValidPhoneNumber(`+${formData.phone}`)) {
            e.phone = t.booking.validations.phoneInvalid;
        }

        if (!formData.englishLevel) {
            e.englishLevel = t.booking.validations.level;
        }

        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validate()) return;
        onSubmit(formData);
    };

    return (
        <form className="space-y-5" noValidate>
            {/* NAME */}
            <FormInput
                label={t.booking.name}
                required
                value={formData.name}
                onChange={(v) => setFormData({ ...formData, name: v })}
                error={errors.name}
                placeholder={t.booking.namePlaceholder}
            />

            {/* EMAIL */}
            <FormInput
                label={t.booking.email}
                type="email"
                required
                value={formData.email}
                onChange={(v) => setFormData({ ...formData, email: v })}
                error={errors.email}
                placeholder={t.booking.emailPlaceholder}
            />

            {/* PHONE */}
            <div className="space-y-2">
                <label className="block text-xs font-semibold uppercase tracking-wide text-blacky">
                    {t.booking.phone}
                    {errors.phone && (
                        <span className="ml-1 text-redy">({errors.phone})</span>
                    )}
                </label>

                <PhoneInput
                    country="gb"
                    value={formData.phone}
                    onChange={(phone) => setFormData({ ...formData, phone })}
                    inputStyle={{
                        width: "100%",
                        height: "42px",
                        borderRadius: "6px",
                        borderColor: errors.phone ? "#ef4444" : "#e5e7eb",
                        fontFamily: "DM Mono, monospace",
                        fontSize: "13px",
                    }}
                    buttonStyle={{
                        borderColor: errors.phone ? "#ef4444" : "#e5e7eb",
                    }}
                />
            </div>

            {/* ENGLISH LEVEL */}
            <FormSelect
                label={t.booking.level}
                options={englishLevels}
                value={formData.englishLevel}
                onChange={(v) => setFormData({ ...formData, englishLevel: v })}
                error={errors.englishLevel}
                placeholder={t.booking.levels.beginner} // Use beginner as default placeholder text or 'Select...'? Image showed 'Beginner' or similar.
            />

            {/* DESCRIPTION */}
            <FormTextarea
                label={t.booking.desc}
                placeholder={t.booking.descPlaceholder}
                rows={4}
                value={formData.description}
                onChange={(v) => setFormData({ ...formData, description: v })}
            />

            <div className="pt-4">
                <PrimaryButton
                    onClick={handleSubmit}
                    fullWidth
                    disabled={isLoading}
                >
                    {isLoading ? t.booking.processing : t.booking.proceed}
                </PrimaryButton>
            </div>
        </form>
    );
}
