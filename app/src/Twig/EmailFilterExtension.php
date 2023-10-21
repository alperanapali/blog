<?php

namespace App\Twig;

use Twig\Extension\AbstractExtension;
use Twig\TwigFilter;

class EmailFilterExtension extends AbstractExtension
{
    public function getFilters(): array
    {
        return [
            new TwigFilter('email_name', [$this, 'emailNameFilter']),
        ];
    }

    public function emailNameFilter($email)
    {
        return strtok($email, '@');
    }
}
