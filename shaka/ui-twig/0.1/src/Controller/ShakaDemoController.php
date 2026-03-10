<?php

declare(strict_types=1);

namespace Shaka\UiTwig\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/shaka', name: 'shaka_demo_')]
final class ShakaDemoController extends AbstractController
{
    #[Route('', name: 'home')]
    public function home(): Response
    {
        return $this->render('shaka/pages/home.html.twig');
    }

    #[Route('/content', name: 'content')]
    public function content(): Response
    {
        return $this->render('shaka/pages/content.html.twig');
    }

    #[Route('/showcase', name: 'showcase')]
    public function showcase(): Response
    {
        return $this->render('shaka/pages/showcase.html.twig');
    }

    #[Route('/components', name: 'components')]
    public function components(): Response
    {
        return $this->render('shaka/pages/showcase.html.twig', [
            'demo_tab' => 'components',
        ]);
    }

    #[Route('/sections', name: 'sections')]
    public function sections(): Response
    {
        return $this->render('shaka/pages/showcase.html.twig', [
            'demo_tab' => 'sections',
        ]);
    }

    #[Route('/layouts', name: 'layouts')]
    public function layouts(): Response
    {
        return $this->render('shaka/pages/showcase.html.twig', [
            'demo_tab' => 'layouts',
        ]);
    }
}
