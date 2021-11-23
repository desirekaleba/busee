const general = (resource: string, action: string) => `${resource} ${action} successfully.`;

export const created = (resource: string) => general(resource, 'created');
export const updated = (resource: string) => general(resource, 'updated');
export const deleted = (resource: string) => general(resource, 'deleted');
export const verified = (resource: string) => general(resource, 'verified');

export const exists = (resource: string) => `${resource} already exists.`;
export const notFound = (resource: string) => `${resource} not found.`;
