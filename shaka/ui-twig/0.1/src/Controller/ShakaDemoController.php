<?php

declare(strict_types=1);

namespace Shaka\UiTwig\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

final class ShakaDemoController extends AbstractController
{
    #[Route('/shaka', name: 'shaka_home')]
    public function home(): Response
    {
        return $this->render('shaka/pages/home.html.twig');
    }

    #[Route('/shaka/content', name: 'shaka_content')]
    public function content(): Response
    {
        return $this->render('shaka/pages/content.html.twig');
    }

    #[Route('/shaka/showcase', name: 'shaka_showcase')]
    public function showcase(): Response
    {
        return $this->render('shaka/pages/showcase.html.twig');
    }
}
