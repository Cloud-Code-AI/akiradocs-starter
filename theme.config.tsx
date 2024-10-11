import React from 'react'
import { DocsThemeConfig } from 'nextra-theme-docs'
import akiraConfig from './akira.json'

const config: DocsThemeConfig = {
  ...(akiraConfig.logo && {
    logo: akiraConfig.logo.image ? (
      <img 
        src={akiraConfig.logo.image} 
        alt={akiraConfig.logo.text || 'Logo'} 
      />
    ) : (
      <span>{akiraConfig.logo.text || 'My Project'}</span>
    ),
    ...(akiraConfig.logo.link && { logoLink: akiraConfig.logo.link }),
  }),
  ...(akiraConfig.project && {
    project: {
      ...(akiraConfig.project.link && { link: akiraConfig.project.link }),
      ...(akiraConfig.project.icon && { 
        icon: (
          <img 
            src={akiraConfig.project.icon} 
            alt="Project Icon"
          />
        )
      }),
    },
  }),
  ...(akiraConfig.chat && {
    chat: {
      ...(akiraConfig.chat.link && { link: akiraConfig.chat.link }),
      ...(akiraConfig.chat.icon && { 
        icon: (
          <img 
            src={akiraConfig.chat.icon} 
            alt="Chat Icon"
          />
        )
      }),
    },
  }),
  ...(akiraConfig.docsRepositoryBase && {
    docsRepositoryBase: akiraConfig.docsRepositoryBase,
  }),
  ...(akiraConfig.footer?.text && {
    footer: {
      text: akiraConfig.footer.text,
    },
  }),
  ...(akiraConfig.head && {
    useNextSeoProps() {
      return {
        titleTemplate: akiraConfig.head.title ? `%s – ${akiraConfig.head.title}` : '%s'
      }
    },
    head: (
      <>
        {akiraConfig.head.description && <meta name="description" content={akiraConfig.head.description} />}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        {akiraConfig.head.title && <meta property="og:title" content={akiraConfig.head.title} />}
        {akiraConfig.head.description && <meta property="og:description" content={akiraConfig.head.description} />}
        {akiraConfig.head.favicon && <link rel="icon" href={akiraConfig.head.favicon} />}
      </>
    ),
  }),
  ...(akiraConfig.nextThemes && {
    nextThemes: {
      defaultTheme: akiraConfig.nextThemes.defaultTheme,
      storageKey: akiraConfig.nextThemes.storageKey,
    },
  }),
  ...(akiraConfig.search?.placeholder && {
    search: {
      placeholder: akiraConfig.search.placeholder,
    },
  }),
  ...(akiraConfig.navbar?.extraContent && {
    navbar: {
      extraContent: akiraConfig.navbar.extraContent,
    },
  }),
  ...(akiraConfig.sidebar && {
    sidebar: {
      titleComponent: ({ title, type }) => <>{title}</>,
      defaultMenuCollapseLevel: akiraConfig.sidebar.defaultMenuCollapseLevel,
      autoCollapse: akiraConfig.sidebar.autoCollapse,
    },
  }),
  ...(akiraConfig.toc && {
    toc: {
      float: akiraConfig.toc.float,
      title: akiraConfig.toc.title,
    },
  }),
  ...(akiraConfig.editLink && {
    editLink: akiraConfig.editLink.disabled ? {
      component: () => null
    } : {
      ...(akiraConfig.editLink.text && { text: akiraConfig.editLink.text })
    }
  }),
  ...(akiraConfig.feedback && {
    feedback: akiraConfig.feedback.disabled ? {
      content: null
    } : {
      ...(akiraConfig.feedback.content && { content: akiraConfig.feedback.content }),
      ...(akiraConfig.feedback.labels && { labels: akiraConfig.feedback.labels })
    }
  }),
  ...(typeof akiraConfig.darkMode !== 'undefined' && {
    darkMode: akiraConfig.darkMode,
  }),
}

export default config;