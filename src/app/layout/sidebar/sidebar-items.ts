import { SidebarItem } from "../../models/sidebar-item.model";

export const SIDEBAR_ITEMS: SidebarItem[] = [

  {
    label: 'Tableau de bord',
    icon: 'dashboard',
    route: '/dashboard',
    roles: ['ALL']
  },

  {
    label: 'Notifications',
    icon: 'notifications',
    route: '/notifications',
    roles: ['ALL']
  },

  {
    label: 'Utilisateurs',
    icon: 'group',
    route: '/users',
    roles: ['ADMIN']
  },

  {
    label: 'Étudiants',
    icon: 'school',
    route: '/students',
    roles: [
      'ADMIN',
      'DIRECTION',
      'RESPONSABLE_FORMATION',
      'SECRETAIRE'
    ]
  },

  {
    label: 'Dossiers étudiants',
    icon: 'folder',
    route: '/student-files',
    roles: [
      'ADMIN',
      'SECRETAIRE'
    ]
  },

  {
    label: 'Groupes',
    icon: 'groups',
    route: '/student-groups',
    roles: [
      'ADMIN',
      'RESPONSABLE_FORMATION'
    ]
  },

  {
    label: 'Formations',
    icon: 'menu_book',
    route: '/formations',
    roles: [
      'ADMIN',
      'DIRECTION',
      'RESPONSABLE_FORMATION'
    ]
  },
  
 /*
  {
    label: 'Formateurs',
    icon: 'co_present',
    route: '/trainers',
    roles: [
      'ADMIN',
      'RESPONSABLE_FORMATION'
    ]
  },
  */

  {
    label: 'Promotions',
    icon: 'workspace_premium',
    route: '/promotions',
    roles: [
      'ADMIN',
      'RESPONSABLE_FORMATION'
    ]
  },

  /*
  {
    label: 'Filières',
    icon: 'account_tree',
    route: '/filieres',
    roles: [
      'ADMIN',
      'RESPONSABLE_FORMATION'
    ]
  }, 
  */

  {
    label: 'Emplois du temps',
    icon: 'event',
    route: '/schedules',
    roles: [
      'ADMIN',
      'RESPONSABLE_FORMATION',
      'ENSEIGNANT',
      'ENSEIGNANT_ASSOCIE',
      'TUTEUR',
      'ETUDIANT'
    ]
  },

  {
    label: 'Réunions',
    icon: 'groups_2',
    route: '/meetings',
    roles: [
      'ADMIN',
      'DIRECTION',
      'RESPONSABLE_FORMATION'
    ]
  },

  {
    label: 'Partenaires',
    icon: 'handshake',
    route: '/partners',
    roles: [
      'ADMIN',
      'INSERTION',
      'APPUI_INSERTION'
    ]
  },

  {
    label: 'Stages',
    icon: 'business_center',
    route: '/internships',
    roles: [
      'ADMIN',
      'INSERTION',
      'APPUI_INSERTION'
    ]
  },

  {
    label: 'Insertions',
    icon: 'work',
    route: '/graduate-insertions',
    roles: [
      'ADMIN',
      'INSERTION',
      'APPUI_INSERTION'
    ]
  },

  {
    label: 'Contacts étudiants',
    icon: 'contacts',
    route: '/students-contacts',
    roles: [
      'ADMIN',
      'INSERTION',
      'APPUI_INSERTION'
    ]
  },

  {
    label: 'Communications',
    icon: 'campaign',
    route: '/communications',
    roles: [
      'ADMIN',
      'SECRETAIRE',
      'RESPONSABLE_FORMATION'
    ]
  },

  {
    label: 'Archives',
    icon: 'archive',
    route: '/archives',
    roles: ['ALL']
  },

  {
    label: 'Documents',
    icon: 'description',
    route: '/administrative-documents',
    roles: [
      'ADMIN',
      'SECRETAIRE'
    ]
  },

  {
    label: 'Budgets',
    icon: 'payments',
    route: '/budgets',
    roles: [
      'ADMIN',
      'DIRECTION'
    ]
  },

  {
    label: 'Personnel',
    icon: 'badge',
    route: '/personnel-files',
    roles: [
      'ADMIN',
      'SECRETAIRE'
    ]
  }
];