"use client"

import React from 'react';
import Link from 'next/link';
import { usePageContent } from "@/hooks/usePageContent"

export function Footer() {
  const { data: footerContent, isLoading, error } = usePageContent('footer')

  // Вспомогательная функция для получения значения по ключу
  const getContent = (section: string, key: string, defaultValue: string = '') => {
    return footerContent?.[section]?.[key] || defaultValue
  }

  if (isLoading) {
    return (
      <footer className="bg-gray-900 text-white py-12 text-center">
        <p>Загрузка футера...</p>
      </footer>
    )
  }

  if (error) {
    return (
      <footer className="bg-gray-900 text-white py-12 text-center">
        <p className="text-red-400">Ошибка загрузки футера: {error.message}</p>
      </footer>
    )
  }

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Контакты</h3>
            <Link
              href={`tel:${getContent('contacts', 'phone_link', '+78001234567')}`}
              className="text-gray-300 hover:text-white transition-colors duration-200"
            >
              {getContent('contacts', 'phone', '8 (800) 123-45-67')}
            </Link>
            <div className="text-xs text-gray-400">{getContent('contacts', 'phone_description', 'Бесплатно по России')}</div>
            <Link
              href={`mailto:${getContent('contacts', 'email_link', 'info@strah-platform.ru')}`}
              className="text-gray-300 hover:text-white transition-colors duration-200"
            >
              {getContent('contacts', 'email', 'info@strah-platform.ru')}
            </Link>
            <div className="text-xs text-gray-400">{getContent('contacts', 'email_description', 'Техподдержка')}</div>
            <span className="text-gray-300">{getContent('contacts', 'address', 'Москва, ул. Тверская, 15')}</span>
            <div className="text-xs text-gray-400">{getContent('contacts', 'address_description', 'Офис продаж')}</div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Информация</h3>
            <ul className="space-y-2">
              <li>
                <Link href={getContent('info_links', 'about_company_link', '#')} className="text-gray-300 hover:text-white transition-colors duration-200">
                  {getContent('info_links', 'about_company_text', 'О компании')}
                </Link>
              </li>
              <li>
                <Link href={getContent('info_links', 'licenses_link', '#')} className="text-gray-300 hover:text-white transition-colors duration-200">
                  {getContent('info_links', 'licenses_text', 'Лицензии')}
                </Link>
              </li>
              <li>
                <Link href={getContent('info_links', 'partners_link', '#')} className="text-gray-300 hover:text-white transition-colors duration-200">
                  {getContent('info_links', 'partners_text', 'Партнеры')}
                </Link>
              </li>
              <li>
                <Link href={getContent('info_links', 'vacancies_link', '#')} className="text-gray-300 hover:text-white transition-colors duration-200">
                  {getContent('info_links', 'vacancies_text', 'Вакансии')}
                </Link>
              </li>
              <li>
                <Link href={getContent('info_links', 'privacy_policy_link', '/privacy')} className="text-gray-300 hover:text-white transition-colors duration-200">
                  {getContent('info_links', 'privacy_policy_text', 'Политика конфиденциальности')}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Следите за нами</h3>
            {/* Social media links here */}
          </div>
        </div>
        <div className="mt-12">
          <div className="text-gray-400 text-sm">{getContent('copyright', 'text', '© 2025 СтрахПлатформа. Все права защищены.')}</div>
          <div className="flex items-center space-x-6 text-sm text-gray-400">
            <span>{getContent('copyright', 'license_text', 'Лицензия ЦБ РФ № 12345')}</span>
            <span>•</span>
            <span>{getContent('copyright', 'rsa_text', 'Член РСА')}</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
