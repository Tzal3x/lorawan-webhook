/// Module: lora_led
module lora_led::lora_led {

    public struct AdminCap has key { id: UID }

    public struct Board has key {
        // A comma is added here after the initializer for `id`:
        id: UID,
        ledState: u64,
    }

    fun init(ctx: &mut TxContext) {
        transfer::transfer(AdminCap {
            id: object::new(ctx)
        }, ctx.sender());
        // Fixed the missing comma after id initialization
        transfer::transfer(Board {
            id: object::new(ctx),
            ledState: 0,
        }, ctx.sender())
    }

    public fun set_led_on(board: &mut Board, _: &AdminCap) {
        board.ledState = 1;
    }

    public fun set_led_off(board: &mut Board, _: &AdminCap) {
        board.ledState = 0;
    }

    // Updated function signature to indicate it returns a u64
    public fun led_read_state(board: &Board): u64 {
        // Since Move implicitly returns the last expression (without a semicolon),
        // this will return the LED state.
        board.ledState
    }
}
