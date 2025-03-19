export default {
  name: 'member',
  title: 'Members',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Full Name',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
    },
    {
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (Rule: any) => Rule.required().email(),
    },
    {
      name: 'role',
      title: 'Role',
      type: 'string',
      options: {
        list: [
          { title: 'Member', value: 'member' },
          { title: 'Executive', value: 'executive' },
          { title: 'Alumni', value: 'alumni' },
        ],
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'executivePosition',
      title: 'Executive Position',
      type: 'string',
      hidden: ({ parent }: any) => parent?.role !== 'executive',
    },
    {
      name: 'avatar',
      title: 'Avatar',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'bio',
      title: 'Biography',
      type: 'blockContent',
    },
    {
      name: 'skills',
      title: 'Skills',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'socialLinks',
      title: 'Social Links',
      type: 'socialLinks',
    },
    {
      name: 'joinDate',
      title: 'Join Date',
      type: 'date',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'status',
      title: 'Membership Status',
      type: 'string',
      options: {
        list: [
          { title: 'Active', value: 'active' },
          { title: 'Inactive', value: 'inactive' },
          { title: 'Suspended', value: 'suspended' },
        ],
      },
      initialValue: 'active',
    },
  ],
  preview: {
    select: {
      title: 'name',
      role: 'role',
      media: 'avatar',
    },
    prepare(selection: any) {
      const { title, role, media } = selection;
      return {
        title,
        subtitle: role.charAt(0).toUpperCase() + role.slice(1),
        media,
      };
    },
  },
} 