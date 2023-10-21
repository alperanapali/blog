<?php

namespace App\DataFixtures;

use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Symfony\Component\PasswordHasher\Hasher\PasswordHasherFactoryInterface;

class AppFixtures extends Fixture
{
    public function __construct(private PasswordHasherFactoryInterface $passwordHasherFactory)
    {
    }

    public function load(ObjectManager $manager): void
    {
        $user = new User();
        $user->setEmail('anapalialper@gmail.com');
        $user->setIsVerified(1);
        $user->setPassword($this->passwordHasherFactory->getPasswordHasher(User::class)->hash('admin'));
        $user->setRoles([]);
        $manager->persist($user);

        $manager->flush();
    }
}
