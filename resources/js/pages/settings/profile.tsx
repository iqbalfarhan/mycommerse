import { type BreadcrumbItem, type SharedData } from '@/types';
import { Transition } from '@headlessui/react';
import { Form, Link, usePage } from '@inertiajs/react';

import DeleteUser from '@/components/delete-user';
import FormControl from '@/components/form-control';
import HeadingSmall from '@/components/heading-small';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import SettingsLayout from '@/layouts/settings/layout';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Profile settings',
    href: '/settings/profile',
  },
];

export default function Profile({ mustVerifyEmail, status }: { mustVerifyEmail: boolean; status?: string }) {
  const { auth } = usePage<SharedData>().props;

  return (
    <SettingsLayout breadcrumbs={breadcrumbs}>
      <div className="space-y-6">
        <HeadingSmall title="Profile information" description="Update your name and email address" />

        <Form
          method="patch"
          action={route('profile.update')}
          options={{
            preserveScroll: true,
          }}
          className="space-y-6"
        >
          {({ processing, recentlySuccessful }) => (
            <>
              <FormControl label="Name">
                <Input
                  id="name"
                  className="mt-1 block w-full"
                  defaultValue={auth.user.name}
                  name="name"
                  required
                  autoComplete="name"
                  placeholder="Full name"
                />
              </FormControl>

              <FormControl label="Email address">
                <Input
                  id="email"
                  type="email"
                  className="mt-1 block w-full"
                  defaultValue={auth.user.email}
                  name="email"
                  required
                  autoComplete="username"
                  placeholder="Email address"
                />
              </FormControl>
              <FormControl label="Phone number">
                <Input
                  type="tel"
                  className="mt-1 block w-full"
                  defaultValue={auth.user.phone}
                  name="phone"
                  required
                  autoComplete="phone"
                  placeholder="Nomor telepon"
                />
              </FormControl>
              <FormControl label="Address">
                <Textarea
                  className="mt-1 block w-full"
                  defaultValue={auth.user.address}
                  name="address"
                  required
                  autoComplete="address"
                  placeholder="Tempat tinggal"
                />
              </FormControl>

              {mustVerifyEmail && auth.user.email_verified_at === null && (
                <div>
                  <p className="-mt-4 text-sm text-muted-foreground">
                    Your email address is unverified.{' '}
                    <Link
                      href={route('verification.send')}
                      method="post"
                      as="button"
                      className="text-foreground underline decoration-neutral-300 underline-offset-4 transition-colors duration-300 ease-out hover:decoration-current! dark:decoration-neutral-500"
                    >
                      Click here to resend the verification email.
                    </Link>
                  </p>

                  {status === 'verification-link-sent' && (
                    <div className="mt-2 text-sm font-medium text-green-600">A new verification link has been sent to your email address.</div>
                  )}
                </div>
              )}

              <div className="flex items-center gap-4">
                <Button disabled={processing}>Save</Button>

                <Transition
                  show={recentlySuccessful}
                  enter="transition ease-in-out"
                  enterFrom="opacity-0"
                  leave="transition ease-in-out"
                  leaveTo="opacity-0"
                >
                  <p className="text-sm text-neutral-600">Saved</p>
                </Transition>
              </div>
            </>
          )}
        </Form>
      </div>

      <DeleteUser />
    </SettingsLayout>
  );
}
