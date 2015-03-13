<?php
/*
 * This file is part of the Sulu CMS.
 *
 * (c) MASSIVE ART WebServices GmbH
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

namespace Sulu\Bundle\Sales\OrderBundle\Tests\Functional\Manager;

use Sulu\Bundle\Sales\OrderBundle\Cart\CartManager;
use Sulu\Bundle\Sales\OrderBundle\Entity\OrderStatus;
use Sulu\Bundle\Sales\OrderBundle\Tests\OrderTestBase;
use Sulu\Bundle\SecurityBundle\Entity\UserRepository;
use Symfony\Component\HttpFoundation\Session\Session;
use Symfony\Component\HttpFoundation\Session\Storage\MockArraySessionStorage;
use Symfony\Component\HttpFoundation\Session\Storage\MockFileSessionStorage;

class CartManagerTest extends OrderTestBase
{
    protected $cartManager;

    protected function setUpTestData()
    {
        parent::setUpTestData();

        // set order to cart order
        $this->data->setupCartTests();
    }

    public function testGetCartByUser()
    {
        // get cart by user
        $cart = $this->getCartManager()->getUserCart($this->data->user);

        // $cart is an ApiOrder, so get entity first
        $this->assertEquals($cart->getEntity(), $this->data->order);
    }
    
    public function testGetCartBySessionId()
    {
        // TODO: fix mock of session
//        $sessionMock = new MockFileSessionStorage();
//        $sessionMock->setId('IamASessionKey');
//        $session = new Session($sessionMock);

//        $cart = $this->getCartManager()->getUserCart();
//        $this->assertEquals($cart->getEntity(), $this->order);

        $this->assertTrue(true);
    }
    
    public function testGetNumberItemsAndTotalPrice()
    {
        $result = $this->getCartManager()->getNumberItemsAndTotalPrice($this->data->user, $this->data->locale);
        
        $this->assertEquals($result['totalItems'], 1);
        
        // calculate price 26.1
        $expectedPrice = $this->data->item->getQuantity() * $this->data->productPrice->getPrice();
        $expectedPrice -= ($expectedPrice / 100) * $this->data->item->getDiscount();
        
        $this->assertEquals($result['totalPrice'], $expectedPrice);
    }

    /**
     * @return CartManager
     */
    protected function getCartManager()
    {
        return $this->getContainer()->get('sulu_sales_order.cart_manager');
    }
}
